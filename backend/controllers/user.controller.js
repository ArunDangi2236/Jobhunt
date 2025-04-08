// const User = require("../models/user.model");
const User=require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/datauri");

const cloudinary=require("../utils/cloudinary") 


const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All field are required",
                success: false
            })
        }

        const file=req.file;
        const fileUri=getDataUri(file)
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content)

        const isUserExist = await User.findOne({ email })
        if (isUserExist) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url
            }
        })

        return res.status(201).json({
            message: "Registered Successfully",
            success: true
        })
    } catch (error) {
        console.log("error from registerController:", error)
        res.status(400).json({
            message: error,
            success: false
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        let isUserExist = await User.findOne({ email })
        if (!isUserExist) {
            return res.status(400).json({
                message: "User not exist,please signup first",
                success: false
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, isUserExist.password)
        if (!isPasswordMatched) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        if (role !== isUserExist.role) {
            return res.status(400).json({
                message: "Account does not exist with current role",
                success: false
            })
        }
        const userData = {
            userId: isUserExist
        }
        const token = await jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })

        const user = {
            _id: isUserExist._id,
            fullname: isUserExist.fullname,
            email: isUserExist.email,
            phoneNumber: isUserExist.phoneNumber,
            role: isUserExist.role,
            profile: isUserExist.profile,
        }

        return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({
            message: `Welcome back ${isUserExist.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log("error from LoginController:", error)
    }

}

const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        const file = req.file;
        // cloudinary ayega idhar
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);



        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        // resume comes later here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { register, login, logout, updateProfile }