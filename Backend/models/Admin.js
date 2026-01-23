const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {type:String, required :true,unique:true},
    password: {type:String,required:true},
    role: {type:String,enum:['ADMIN','HEAD_ADMIN'],default:'ADMIN'},
    status:{type:String, enum: ['pending','active'],default:'pending'}
},
    { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = { Admin };