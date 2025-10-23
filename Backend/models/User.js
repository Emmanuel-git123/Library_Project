const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Author', 'Supervisor', 'Admin'], default: 'Author', required: true },
    departmentId:{type:mongoose.Schema.Types.ObjectId,ref:"Department",required:true},
    degreeType:{ type: String, enum: ['Btech', 'MA', 'MSc','MTech','MTech by Research','PhD'], default: 'Btech', required: true },
    thesis:[{type:mongoose.Schema.Types.ObjectId,ref:"Thesis"}],
    yearOfEnrollment: { type: Number },
    
},
    {timestamps:true}
);

const User = mongoose.model("User", userSchema);

module.exports = { User };