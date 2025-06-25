const Logs = require('../model/logs');
const _ = require('lodash');
const OPENAI_API_KEY = 'AIzaSyDziz6GwGEICsbcA7RBOuBhwY7pgcPbkWo';
const {GoogleGenerativeAI}  = require("@google/generative-ai");


exports.createLog = async (req) => {
  try {
    const timesheetData = req.body;
    const groupedByUser = _.groupBy(timesheetData, (row) => row.employee?.trim());
    const results = await Promise.all(
    Object.entries(groupedByUser).map(async ([userName, userEntries]) => {
        const timesheetText = userEntries
          .map(row => `${row.project}\t${row.task}\t${row.employee}\n${row.totalHours}\t${row.date}\t`)
          .join('\n');

        const date = userEntries[0].date;
        const existing = await Logs.find({name: userName,date: date});
        console.log('existing', existing)

        if (existing && existing.length > 0) {
        return {
            success: 0,
            status: 400,
            message: "Already exists"
        };
        }


           const prompt = `
You are a professional AI assistant responsible for analyzing a developer's weekly timesheet and comparing it against the manager's expected plan. Use the following JSON input:



**1. Developer’s Logged Timesheet Data:**
${JSON.stringify(timesheetText, null, 2)}

---

## Output Format (HTML Only)

Return your response in clean, scannable **HTML format** with appropriate use of:

- <table>, <tr>, <th>, <td> for comparisons
- <ul>, <li> for summaries
- <strong>, <u>, <i> for emphasis
---

### Sections to Include

- Table comparing:
  - **Project Name**
  - **Task Description**
  - **User Name**
  - **Date** 
  - **Time Spent (HH:MM:SS)**

### 2. <u>Project Summary</u>
- Project Name

---

⚠️ Be precise with math. Do not estimate. Sum hours exactly.
      `;

        const response = await callOpenAIWithRetry(prompt);
        const text = await response.response.text();
        await Logs.create({
            name: userName,
            date,
            htmlReport: text,
        });
      })
    );

    return {
      success: 1,
      statusCode: 200,
      message: "Reports generated successfully",
      results,
    };
  } catch (error) {
    console.error("Error analyzing timesheet:", error);
    throw new Error("Failed to analyze timesheet data");
  }
};


exports.getLogs = async () => {
    try {
        const logs = await Logs.find();
        return {
            success: 1,
            statusCode: 200,
            message: 'Logs fetched successfully',
            data: logs
        };
    } catch (error) {
        return {
            success: 0,
            statusCode: 500,
            message: 'Failed to fetch logs',
            error: error.message
        };
    }
};

async function callOpenAIWithRetry(prompt) {
        const genAI = new GoogleGenerativeAI(OPENAI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        return result;
}   
