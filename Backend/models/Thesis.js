const mongoose = require('mongoose');

const thesisSchema = new mongoose.Schema({
    title: { type: String, required: true },
    abstract: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" }, 
    degreeType: { type: String, enum: ['Btech', 'MA', 'MSc','MTech','MTech by Research','PhD'], required: true },
    pdfUrl: { type: String },
    keywords: [{ type: String }],
    year:{type:Number,required:true}
}, { timestamps: true });

const Thesis = mongoose.model("Thesis", thesisSchema);
module.exports = { Thesis };
