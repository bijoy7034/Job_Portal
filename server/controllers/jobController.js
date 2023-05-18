const { default: mongoose } = require("mongoose");
const Job = require("../models/jobModel")
const jwt = require('jsonwebtoken')


const createJob = async(req,res)=>{
    try{
        const token = req.cookies.access_token;
        if(!token){
            return res.status(401).json({mssg:'You are not authenticated'})
        }
        jwt.verify(token, "secret_key", (err,user)=>{
            if(err) return res.status(403).json({mssg:'Token not valid'})
        req.user = user;
        })

         const title = req.body.title
         const description = req.body.description
         const requirements = req.body.requirements
         const location = req.body.location
         const salary = req.body.salary
         const time = req.body.time
         const nature = req.body.nature
         const postedBy = req.user.id



        const job = await Job.create({title, description,requirements,location,salary,time,nature,postedBy})
        if(job){
            res.status(200).json(job)
        }else{
            res.status(400).json({mssg:"Job Not Created"})
        }
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

const getJobsId = async(req,res)=>{
    try{
        const token = req.cookies.access_token;
        if(!token){
            return res.status(401).json({mssg:'You are not authenticated'})
        }
        jwt.verify(token, "secret_key", (err,user)=>{
            if(err) return res.status(403).json({mssg:'Token not valid'})
        req.user = user;
        })
        const jobs = await Job.find({postedBy:req.user.id}).sort({createdAt : -1})
        if(!jobs){
            res.status(404).json({mssg:"No jobs found"})
        }else{
            res.status(200).json(jobs)
        }
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

const getAllJobs = async(req,res)=>{
    try{
        const token = req.cookies.access_token;
        if(!token){
            return res.status(401).json({mssg:'You are not authenticated'})
        }
        jwt.verify(token, "secret_key", (err,user)=>{
            if(err) return res.status(403).json({mssg:'Token not valid'})
        req.user = user;
        })
        const jobs = await Job.find({postedBy:{$ne :req.user.id}}).sort({createdAt : -1})
        if(!jobs){
            res.status(404).json({mssg:"No jobs found"})
        }else{
            res.status(200).json(jobs)
        }
    }catch(err){
        res.status(400).json({error:err.message})
    }
}
const deleteJob = async(req,res)=>{
    const { id } = req.params
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({mssg :"No record found"})
        }
        const job = await Job.findOneAndDelete({_id: id})
        res.status(200).json(job)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

const updateJob = async(req,res)=>{
    try{
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({mssg :"No record found"})
        }
        const job = await Job.findOneAndUpdate({_id:id}, {...req.body})
        res.status(200).json(job)
    }catch(err){
         res.status(400).json({error:err.message})
    }
}

const addApplication = async(req,res)=>{
    try{
        const { id } = req.params
        const token = req.cookies.access_token;
        if(!token){
            return res.status(401).json({mssg:'You are not authenticated'})
        }
        jwt.verify(token, "secret_key", (err,user)=>{
            if(err) return res.status(403).json({mssg:'Token not valid'})
        req.user = user;
        })
        const job = await Job.findOneAndUpdate({_id: id}, {$push: {applied: req.user.id}})
        res.status(200).json(job)

    }catch(err){
        res.status(400).json({error:err.message})
    }
}



module.exports = {
    createJob,
    getAllJobs,
    getJobsId,
    deleteJob,
    updateJob,
    addApplication
}