const { registerCompany, getCompany, updateCompany, getCompanyById } = require("../controllers/company.controller")
const isAuthenicated = require("../middlewares/isAuthenticated")

const router=require("express").Router()

router.route("/register").post(isAuthenicated,registerCompany)
router.route("/get").get(isAuthenicated,getCompany)
router.route("/get/:id").get(isAuthenicated,getCompanyById)
router.route("/update/:id").put(isAuthenicated,updateCompany)

module.exports=router