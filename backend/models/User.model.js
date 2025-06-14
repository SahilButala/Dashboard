import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
      name : {
        type : String,
        required : true,
        unique: true
      },
      email : {
        type : String,
        required : true,
      },
      password :{
        type : String,
        required : true
      },
},{timestamps:true})

const UserModel = mongoose.model.user || mongoose.model("user",UserSchema)

export default UserModel