const { Subject } = require("../../models/Subject");

const createSubject = async (req, res) => {
    try {
        const newSubject = new Subject(req.body);
        await newSubject.save();
        res.status(201).json({ message: "Subject created", subject: newSubject });
    } catch (error) {
        console.error("Error creating subject:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllSubjects = async (req, res) => {
    try {
        const { departmentId } = req.query;
        const filter = {};
        if (departmentId) filter.departmentId = departmentId;

        const subjects = await Subject.find(filter);
        res.status(200).json({ count: subjects.length, subjects });
    } catch (error) {
        console.error("Error getting subjects:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) return res.status(404).json({ message: "Subject not found" });
        res.status(200).json({ subject });
    } catch (error) {
        console.error("Error getting subject:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Subject updated", subject });
    } catch (error) {
        console.error("Error updating subject:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteSubject = async (req, res) => {
    try {
        await Subject.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Subject deleted" });
    } catch (error) {
        console.error("Error deleting subject:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject
};
