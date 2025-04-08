const router=require("express").Router()
const { applyJob, getappliedJobs, getApplicant, updateStatus } = require("../controllers/application.conroller")
const isAuthenicated = require("../middlewares/isAuthenticated")

router.route("/apply/:id").get(isAuthenicated,applyJob)
router.route("/get").get(isAuthenicated,getappliedJobs)
router.route("/:id/applicants").get(isAuthenicated,getApplicant)
router.route("/status/:id/update").post(isAuthenicated,updateStatus)

module.exports=router