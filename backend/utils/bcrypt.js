const bcrypt=require("bcrypt")


//hash passowrd
async function hashPassword(passowrd){
    const salt=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(passowrd,salt)

    return hashPassword

}

//check password
async function checkPassword(actualPassword,passowrd)
{
    const isValid=await bcrypt.compare(actualPassword,passowrd)
    return isValid
}

module.exports={hashPassword,checkPassword}