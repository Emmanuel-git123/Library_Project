const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { type: String, enum: ['Engineering', 'Science', 'Humanities', 'Social Science'], required: true },
},
    { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);
module.exports = { Department };