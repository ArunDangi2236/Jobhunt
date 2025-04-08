const { register, login, logout, updateProfile } = require("../controllers/user.controller")
const isAuthenicated = require("../middlewares/isAuthenticated")
const { singleUpload } = require("../middlewares/multer")

const router = require("express").Router()

router.route("/register").post(singleUpload,register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").post(isAuthenicated,singleUpload, updateProfile)

module.exports = router 