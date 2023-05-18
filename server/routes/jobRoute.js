const express = require('express')
const { createJob, getAllJobs, getJobsId, deleteJob, updateJob, addApplication } = require('../controllers/jobController')

const jobRouter = express.Router()

jobRouter.post('/createjob', createJob )
jobRouter.get('/all', getAllJobs)
jobRouter.get('/posted', getJobsId)
jobRouter.delete('/delete/:id', deleteJob)
jobRouter.patch('/update/:id', updateJob)
jobRouter.patch('/application/:id',addApplication)

module.exports = jobRouter