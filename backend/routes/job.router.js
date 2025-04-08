const { jobPost, getAllJobs, getAdminJobs, getJobByID } = require("../controllers/job.controller")
const isAuthenicated = require("../middlewares/isAuthenticated")

const router=require("express").Router()

router.route("/post").post(isAuthenicated ,jobPost)
router.route("/get").get(isAuthenicated ,getAllJobs)
router.route("/getAdminJobs").get(isAuthenicated ,getAdminJobs)
router.route("/get/:id").get(isAuthenicated ,getJobByID)

module.exports=router 