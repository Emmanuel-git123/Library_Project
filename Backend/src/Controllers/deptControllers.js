const { Department } = require("../../models/Department");

const createDepartment = async (req, res) => {
    try {
        const newDept = new Department(req.body);
        await newDept.save();
        res.status(201).json({ message: "Department created", department: newDept });
    } catch (error) {
        console.error("Error creating department:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json({ count: departments.length, departments });
    } catch (error) {
        console.error("Error getting departments:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getDepartmentById = async (req, res) => {
    try {
        const dept = await Department.findById(req.params.id);
        if (!dept) return res.status(404).json({ message: "Department not found" });
        res.status(200).json({ department: dept });
    } catch (error) {
        console.error("Error getting department:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const dept = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Department updated", department: dept });
    } catch (error) {
        console.error("Error updating department:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteDepartment = async (req, res) => {
    try {
        await Department.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Department deleted" });
    } catch (error) {
        console.error("Error deleting department:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};
