const express=require("express")
const {login,signUp}=require("../controllers/userAuth")
const route=express.Router()



//routes
route.post("/signUp",signUp)
route.post("/login",login)


module.exports=route