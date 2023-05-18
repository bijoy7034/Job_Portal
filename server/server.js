const express = require('express')
const dotenv = require('dotenv')
const { default: mongoose } = require('mongoose')
const userRouter = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')
const jobRouter = require('./routes/jobRoute')
const app = express()
dotenv.config()
const PORT = process.env.PORT || 8080
app.use(cookieParser())
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
//routes
app.use('/api/job/', jobRouter)
app.use('/api/users/', userRouter)


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`SERVER RUNNING ON PORT ${PORT}`)
    })
})