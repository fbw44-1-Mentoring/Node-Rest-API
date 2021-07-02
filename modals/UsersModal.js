const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
const UserSchema = new Schema({
    username: {type:String, required:true,unique:true},
    password: {type:String, required:true},
    email:{type:String, required:true}
})


/* UserSchema.pre("save", function(){

    const hashedPassword= bcrypt.hashSync(this.password, 10)
    this.password= hashedPassword
    console.log("storing user into database")
})


UserSchema.post("save", function(){
    console.log("new user added into database")
}) */

const UsersModal= mongoose.model("users", UserSchema)

module.exports= UsersModal