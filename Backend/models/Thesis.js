const mongoose = require('mongoose');

const thesisSchema = new mongoose.Schema({
    title: { type: String, required: true },
    abstract: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required:true}, 
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    degreeType: { type: String, enum: ['Btech', 'MA', 'MSc','MTech','MTech by Research','PhD'], required: true },
    pdfUrl: { type: String, required:true },
    keywords: [{ type: String , required:true }],
    year:{type:Number,required:true},
    status:{type: String, enum: ['uploaded', 'extracting', 'awaiting_review', 'published'], default:'uploaded'},
    allowDownload: {type: Boolean, default: false}
}, { timestamps: true });

const Thesis = mongoose.model("Thesis", thesisSchema);
module.exports = { Thesis };
