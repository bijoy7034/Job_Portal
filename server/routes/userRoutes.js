const express = require("express");
const { register, login, fetchUser, logout } = require("../controllers/userController");
const { verifyToken } = require("../utils/verifyToken");

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/checkAuth', verifyToken, (req,res)=>{
    res.status(200).json({mssg:'You are logged in'})
})
userRouter.get('/user' , fetchUser)
userRouter.get('/logout', logout)

module.exports = userRouter