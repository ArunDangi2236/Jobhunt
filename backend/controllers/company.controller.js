const Company = require("../models/company.model");

const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            })
        }

        const userId = req.id
        let company = await Company.findOne({ name: companyName })

        if (company) {
            return res.status(400).json({
                message: "Company already registered",
                success: false
            })
        }

        company = await Company.create({
            name: companyName,
            userId
        })

        return res.status(201).json({
            message: "Company registered successfully",
            userId,
            success: true
        })
    } catch (error) {
        console.log("error form the company registerController:", error)

    }
}

const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId })
        if (!companies) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log("error from the getCompanyController:", error)

    }
}

const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId )

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log("error from the getCompanyByIdController:", error)
 
    }
}

const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location, } = req.body;

        const updateData = { name, description, website, location };

        let company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true })

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(200).json({
            message:"Company Details updated successfully",
            success: true
        })
    } catch (error) {
        console.log("error from updateCompanyController:", error)

    }
}

module.exports = { registerCompany, getCompany, getCompanyById, updateCompany }