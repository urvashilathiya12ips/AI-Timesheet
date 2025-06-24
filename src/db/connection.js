const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://Urvashi:Urvashi_itpath@cluster0.sicvgpb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Database connection success");
}).catch((error) =>
  console.error(`Database connection failed, ${error.message}`)
);