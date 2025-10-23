const { User } = require("../../models/User");

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "User created", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const { role, departmentId, degreeType } = req.query;
        const filter = {};
        if (role) filter.role = role;
        if (departmentId) filter.departmentId = departmentId;
        if (degreeType) filter.degreeType = degreeType;

        const users = await User.find(filter).populate("departmentId", "name").populate("thesis", "title");
        res.status(200).json({ count: users.length, users });
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate("departmentId", "name")
            .populate("thesis", "title");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate("departmentId", "name")
            .populate("thesis", "title");
        res.status(200).json({ message: "User updated", user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
