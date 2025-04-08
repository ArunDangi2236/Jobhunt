const cookieParser = require("cookie-parser");
const dotenv=require("dotenv")
const express = require("express")
const cors = require("cors");
const connectDB = require("./utils/db");

const userRoute=require("./routes/user.router")
const companyRoute=require("./routes/company.router")
const ApplicationRoute=require("./routes/application.router")
const jobRouter=require("./routes/job.router")


// app.use(cors({
//     origin: 'http://localhost:5173', 
//     methods: ['GET', 'POST',"DELETE","PUT"],
//     credentials: true
// }));

dotenv.config({})
const app = express(); 

const corsOption = {
    // origin: "http//localhost:5173",
    // credentials: true
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST',"DELETE","PUT"],
    credentials: true
}
//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors(corsOption))

//Routes Or API's
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRouter)
app.use("/api/v1/application",ApplicationRoute)


const PORT =process.env.PORT || 4000
app.listen(PORT, () => {
    connectDB()
    console.log(`Server running on PORT:${PORT}`)
})