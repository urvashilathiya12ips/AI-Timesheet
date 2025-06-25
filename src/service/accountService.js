const OPENAI_API_KEY = 'AIzaSyDziz6GwGEICsbcA7RBOuBhwY7pgcPbkWo';
const {GoogleGenerativeAI}  = require("@google/generative-ai");
const Project = require("../model/project.js");
const Task = require("../model/task.js");
const AnalysisReport = require("../model/report");
const _ = require('lodash');

const dayjs = require('dayjs');

exports.analyzer = async (body) => {
      const { timesheetData, selectedProjectIds } = body;
      const projects = await Project.find({ _id: { $in: selectedProjectIds } });
      const tasks = await Task.find({ projectId: { $in: selectedProjectIds } });
      const expectedPlan = projects.map(project => {
      const projectTasks = tasks.filter(task => task.projectId.toString() === project._id.toString());
        const start = dayjs(project.startDate);
        const end = dayjs(project.endDate);
        return {
          projectName: project.name,
          week: start.isValid() && end.isValid()
                ? `${start.format('YYYY-MM-DD')} - ${end.format('YYYY-MM-DD')}`
                : 'Invalid Date Range',       
            expectedTasks: projectTasks.map(task => ({
            taskName: task.taskName,
            expectedHours: task.hours
          }))
        };
      });
    
      const prompt = `
You are a professional AI assistant responsible for analyzing a developer's weekly timesheet and comparing it against the manager's expected plan. Use the following JSON input:

**1. Manager’s Expected Weekly Plan:**
${JSON.stringify(expectedPlan, null, 2)}

**2. Developer’s Logged Timesheet Data:**
${JSON.stringify(timesheetData, null, 2)}

---

### 🔍 Your Tasks:

1. **Normalize Task Names (Semantic Grouping)**
   - Group tasks with similar meaning. Example:
     - "Fix Bugs from 8th Iteration", "Bug Fixing", etc. → **"Bug Fixes"**
     - "Lifetime Subscription Flow", "Subscription Implementation" → **"Subscription"**
   - Match them **dynamically** based on partial match or semantic meaning.

2. **Aggregate Task Details**
  - For each grouped task:
    - Sum all logged hours across all dates.
    - Count how many entries are:
       - **Completed**
       - **In Progress**

3. **Match with Expected Plan**
  - Compare each grouped task with those listed in the manager’s plan.
   - If the task exists in the timesheet but not in the plan → mark as **Out-of-Scope**
   - If a task exists in the plan but has no time logged → mark as **Not Started**

4. **Determine Task Completion Status**
   - ✅ **Completed**: Majority or last status is “Completed”
   - 🔄 **In Progress**: Most logs are “In Progress”
   - ⛔ **Not Started**: No logs at all

5. **Detect Rework**
  - If a task was marked **completed on a certain date**, and **later had more time logged**, it’s **rework**.
  - For rework, provide:
     - **Task Name**
     - **Original Completion Date**
     - **Rework Dates**
     - **Rework Hours**
    - Format:  
      - 🛠️ _Fix Bugs from 8th Iteration – 4 hrs rework on 17/06/2025 and 18/06/2025 after original completion on 16/06/2025_

6. **Calculate Variance**
  - Compare Expected vs Actual hours:
    - “Over by X hrs”
    - “Under by Y hrs”
    - “On Track”

---

## Output Format (HTML Only)

Return your response in clean, scannable **HTML format** with appropriate use of:

- <table>, <tr>, <th>, <td> for comparisons
- <ul>, <li> for summaries
- <strong>, <u>, <i> for emphasis
- Use 🔄, ✅, ⛔ emojis for status

---

### Sections to Include

### 1. <u>Expected vs. Actual Hours per Deliverable</u>
- Table comparing:
  - **Deliverable Name**
  - **Expected Hours**
  - **Total Logged Hours**
  - **Status** (✅, 🔄, ⛔)
  - **Variance**

### 2. <u>Project Summary</u>
- Total Expected Hours
- Total Actual Hours

### 3. <u>Daily Summary (Mon–Fri)</u>
- Summarize entries per day.
- Mention any blockers or no-log days.

### 4. <u>Rework Analysis</u>
- Detect and list all tasks with time logged **after** first completion
- Format:
  - 🛠️ _[Task Name] – X hrs rework on [Rework Date(s)] after original completion on [Date]_

### 5. <u>Out-of-Scope Tasks</u>
- List all tasks that were not in the expected plan.
- Total time spent.

### 6. <u>Performance Insights</u>
- Productivity score = (Completed Tasks / Total Tasks) × 100
- Any signs of overwork or underutilization
- Time spent on non-core tasks

---

⚠️ Be precise with math. Do not estimate. Sum hours exactly.
      `;

    try {
        const response = await callOpenAIWithRetry(prompt);
        const text = response.response.text(); 
        await Promise.all(expectedPlan.map(async (plan) => {
          const name = timesheetData.find(v => v.name)?.name || plan.projectName;
          const week = plan.week;
          const existing = await AnalysisReport.findOne({ name, week });
            if (existing){
                return {
                success: 1,
                statusCode: 404,
                message: 'Already Report generated'
              };  
            }
            // Create new report
            await AnalysisReport.create({
              name,
              week,
              htmlReport: text,
            });
          }));


        return {
            success: 1,
            statusCode: 200,
            message: 'Timesheet analysis completed successfully',
            data: text
        };  
    } catch (error) {
        console.error('Error analyzing timesheet:', error);
        throw new Error('Failed to analyze timesheet data');
    }
};

exports.project = async (body) => {
   const { name, startDate, endDate, tasks } = body;

    // Validation
    if (!name || !startDate || !endDate || !Array.isArray(tasks) || tasks.length === 0) {
       return {
            success: 1,
            statusCode: 400,
            message: 'All fields are required and at least one task must be provided.',
        };
    }
    const existingProject = await Project.findOne({
      name,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
    if (existingProject) {
      return {
        success: false,
        statusCode: 400,
        message: "Project with same name and date range already exists",
      };
    }
    const project = await Project.create(
      { name, startDate: new Date(startDate), endDate: new Date(endDate) });

    const taskData = tasks.map((task) => ({
      projectId: project._id,
      taskName: task.taskName,
      hours: task.hours,
    }));

    await Task.insertMany(taskData);
    return {
        success: 1,
        statusCode: 201,
        message: 'Project and tasks created successfully.',
    };
}

exports.projectList = async () => {
    try {
        const projects = await Project.find();
        const uniqueReports = _.uniqBy(projects, 'name')
        return {
            success: 1,
            statusCode: 200,
            message: 'Projects fetched successfully',
            data: uniqueReports 
        };
    } catch (error) {
        console.error('Error fetching projects:', error);
        return {
            success: 0,
            statusCode: 500,
            message: 'Failed to fetch projects',
            error: error.message
        };
    }
}

exports.removeProject = async (projectId) => {
     try {
        const result = await Project.findByIdAndDelete(projectId);
        if (!result) {
            return {
                success: 0,
                statusCode: 404,
                message: 'Project not found'
            };
        }
        return {
            success: 1,
            statusCode: 200,
            message: 'Project delete successfully'
        };
    } catch (error) {
        console.error('Error fetching Projects:', error);
        return {
            success: 0,
            statusCode: 500,
            message: 'Failed to fetch Projects',
            error: error.message
        };
    }
       
}

async function callOpenAIWithRetry(prompt) {
        const genAI = new GoogleGenerativeAI(OPENAI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        return result;
}   







