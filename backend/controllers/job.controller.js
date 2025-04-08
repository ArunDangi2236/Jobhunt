const User = require("../models/user.model")
const Job = require("../models/job.model")
const Company=require("../models/company.model")
const jobPost = async (req, res) => {
    try {
        const {
            title,
            description,
            salary,
            experienceLevel,  // Ensure this is a number
            location,
            jobType,
            position,  // Ensure this is a number
            companyId
        } = req.body;

        const userId = req.id;

        if (!title || !description || !salary || !experienceLevel || !location || !jobType || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if (user.role !== "recruiter") {
            return res.status(400).json({
                message: "Only Recruiter can post jobs",
                success: false
            });
        }

        // Convert experienceLevel and position to numbers if they are not already
        const experienceLevelNum = Number(experienceLevel);
        const positionNum = Number(position);

        if (isNaN(experienceLevelNum) || isNaN(positionNum)) {
            return res.status(400).json({
                message: "Experience Level and Position must be numbers",
                success: false
            });
        }

        const newJob = await Job.create({
            title,
            description,
            salary,
            experienceLevel: experienceLevelNum,  // Use converted number
            location,
            jobType,
            position: positionNum,  // Use converted number
            company: companyId,
            created_by: userId,
        });

        return res.status(201).json({
            message: "New job created successfully",
            newJob,
            success: true
        });

    } catch (error) {
        console.log("Error from the jobPostController:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const getAllJobs=async (req,res)=>{
    try {
        const keyword=req.query.keyword || ''
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }
        // 67e3cff4d916b6f03ac7fbbe 

        const jobs = await Job.find(query).populate('company').sort({ createdAt: -1 });

        if(!jobs){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log("error from getAllJobsController",error)
        
    }

}

const getJobByID = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log("error from getJobByIdContoller:", error)
 
    }
}

const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({ created_by: adminId })
        if (!jobs) {
            return res.status(400).json({
                message: "No job is found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log("error from getAdminJobsController:", error)
    }
}
module.exports = { jobPost ,getAllJobs,getJobByID,getAdminJobs}