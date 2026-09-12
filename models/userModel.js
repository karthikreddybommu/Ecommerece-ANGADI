import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, trim:true},
    email:{type:String, required: true, trim: true, unique: true, lowercase: true},
    password:{type:String, required: true, trim: true},  
    role:{enum:["user", "admin"], default:"user", type:String, lowercase: true}      
},
{
    timestamps: true
})

const User = mongoose.model('user', userSchema);
export default User;
export { User };