const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
    email:{type:String,required:true},
    token:{type:String,required:true,unique:true},
    expiresAt:{type:Date,required:true},
    used:{type:Boolean,default:false},
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"Admin",required:true}
},
    { timestamps: true }
);

const Invite = mongoose.model("Invite", inviteSchema);
module.exports = { Invite };