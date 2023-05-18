const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require("mongoose");



const register = async(req,res)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const email = req.body.email
    const password = hash
    const name = req.body.name
    const role = req.body.role
    const description = req.body.description
    const phone = req.body.phone

   try{
     const user = await userModel.create({email,password,name,role,description,phone})
     if(user){
        res.status(200).json(user)
     }
   }catch(err){
    res.status(400).json({error:err.message})
   }
}


const login = async(req,res)=>{
    try{
        const user = await userModel.findOne({email:req.body.email})
        if(!user) return res.status(404).json({mssg:"User Not Found"})

        const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
        );
        if(!isPasswordCorrect){
            res.status(404).json({mssg:"Wrong password"})
        } 


        //token
       const token = jwt.sign({ id: user._id, isAdmin: user.role},"secret_key" );
       const { password, role, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, role });
    } 
    catch(err){
            res.status(400).json({error:err.message})
    }
}

const fetchUser = async(req,res)=>{
   try{
    const token = req.cookies.access_token;
        if(!token){
            return res.status(401).json({mssg:'You are not authenticated'})
        }
        jwt.verify(token, "secret_key", (err,user)=>{
            if(err) return res.status(403).json({mssg:'Token not valid'})
        req.user = user;
        })

        const { id } = req.user.id
        const user = await userModel.find({_id:req.user.id})
        if(user){
          res.status(200).json(user)
        }else{
          res.status(404).json({mssg :"Not Found"})
        }
   }catch(err){
    res.status(400).json({error:err})
   }
}
const logout = async(req,res)=>{
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
}
module.exports = {
    register,
    login,
    fetchUser,
    logout
}