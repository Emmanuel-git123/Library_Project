const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", default: null }, 
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }, 
}, 
{ timestamps: true }
);

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = { Subject };
