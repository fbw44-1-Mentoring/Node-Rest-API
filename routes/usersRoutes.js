const express = require("express")
const Router = express.Router()
const bcrypt = require("bcrypt")
const UsersModal= require("../modals/UsersModal")
const jwt = require("jsonwebtoken")

Router.get("/", async (req,res)=>{
    try{
        let users = await UsersModal.find({})
        res.send({success:true, users:users})
    }
    catch(err){
        console.log(err.message)
    }
} )


Router.post("/", async (req,res)=>{
    console.log(req.body)
    //signup

    //hasing passsword
    const hashedPassword= bcrypt.hashSync(req.body.password,10)
    console.log(hashedPassword)


   //creating user instance from usersModal
    let user = new UsersModal({
        username: req.body.username,
        email:req.body.email,
        password: /* req.body.password */hashedPassword
    })
    try{
        //storing into database
        await user.save()
        res.send({success:true, user:user})
    }
    catch(err){
        console.log(err.message)
    } 
})


Router.post("/login", async (req,res)=>{
    //login
   try{
            //Find user into database with this username
       const user= await UsersModal.findOne({username: req.body.username})
        if(user===null){
            return res.status(404).send({success:false, message:"no such user found in DB"})
        }
        //checking password
       const checkPassword = bcrypt.compareSync(req.body.password,user.password )
       if(checkPassword){
           let token = jwt.sign( {id:user._id, username:user.username} , "naqvi")
           res.header("code", token)
           res.cookie("code",token)
           return res.send({success:true, user:user})
       }else{
           return res.send({success:false, message:"password doesn't match"})
       }
   }
   catch(err){
       console.log(err.message)
   }
})



module.exports= Router