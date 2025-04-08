const { populate } = require("dotenv");
const Application = require("../models/application.model");
const Job = require("../models/job.model");

const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }

        //Checking if the user already applied for the job or not
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You already applied",
                success: false
            });
        }

        //checking if job exists or not
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        // Push the new application into the correct 'applications' field
        job.applications.push(newApplication);
        await job.save();

        return res.status(200).json({
            message: "Job applied successfully",
            success: true
        });
    } catch (error) {
        console.log("error from applicationController:", error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message,
        });
    }
};

const getappliedJobs = async (req, res) => {
    const userId = req.id;

    const appliedJobs = await Application.findOne({ applicant: userId }).sort({ createdAt: -1 }).populate({
        path: "job",
        options: {
            sort: { createdAt: -1 }
        },
        populate: {
            path: "company",
            options: {
                sort: { createdAt: -1 }
            }
        }
    })
    if (!appliedJobs) {
        return res.status(400).json({
            message: "You have not applied for any job",
            success: false
        })
    }

    return res.status(400).json({
        appliedJobs,
        success: true
    })
}

const getApplicant = async (req, res) => {
    try {
        const jobId = req.params.id

        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant"
            }
        })
        if (!job) {
            return res.status(404).json({
                message: "Applicanta not found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log("error from getApplicantController", error)

    }
}

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicantId = req.params.id;
        if (!status) {
            return status(400).json({
                message: "Status is required",
                success: false
            })
        }
        const application = await Application.findOne({ _id: applicantId })
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            })
        }

        application.status = status.toLowerCase();
        await application.save()

        return res.status(200).json({
            message: "Status updated successfully",
            success: false
        })
    } catch (error) {
        console.log("erorr from updateStatusController:", error)

    }
}
module.exports = { applyJob, getappliedJobs, getApplicant ,updateStatus}