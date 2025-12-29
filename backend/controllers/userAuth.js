const User = require("../models/User")
const { hashPassword, checkPassword } = require("../utils/bcrypt")
const jwt=require("jsonwebtoken")
//signup
async function signUp(req, res) {
    try {

        const { userName, password, email, number } = req.body
        if (!userName || !password || !email) {
            return res.status(401).json({
                message: "All fild is required"
            })
        }

        //to check if email exist
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(409).json({
                message: "User already exist"
            })
        }
        const hPassword = await hashPassword(password)
        const user=await   User.create({
            name: userName,
            email,
            password: hPassword
        })
        //create a payload
        const payload={
            id: user._id,
            email: user.email,
            name:user.name
        }
        //create the token
        const token=jwt.sign(payload,process.env.SECRET_KEY)

        //send this token
        return res.status(200).json({
            message: "Success",
            user :{
                userId:user._id,
                name: user.name,
                email: user.email
            },
            token: token
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Server Error please try again later"
        })

    }
}


//login
async function login(req, res) {
    try {   
        const {email,password}=req.body
        if(!email || !password)
        {
            return res.status(401).json({
                message: "All fild is required"
            })
        }

        const user=await User.findOne({email:email})
        //checking the user weather present or not
        if(!user)
        {
            return res.status(404).json({
                message: "User not found please sign-up first"
            })
        }

        //lets verify the password
        const isValid=await checkPassword(password,user.password)
        if(!isValid)
        {
            return res.status(401).json({
                message: "Your password is wrong. Please enter valid pasword"
            })
        }

         //create a payload
        const payload={
            id: user._id,
            email: user.email,
            name:user.name
        }
        //create the token
        const token=jwt.sign(payload,process.env.SECRET_KEY)

        //send this token
        return res.status(200).json({
            message: "Success",
            user :{
                userId:user._id,
                name: user.name,
                email: user.email
            },
            token: token
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Server Error please try again later"
        })

    }
}


module.exports={signUp,login}