const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const noteRoute = require('./routes/notes')


dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> {
  console.log("DB Connected")
}).catch((err) =>{
  console.log(err)});

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/notes", noteRoute)


app.listen("3000", ()=>{
  console.log("Backend is running");
})
