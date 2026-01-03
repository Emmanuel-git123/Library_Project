const { Thesis } = require("../../models/Thesis")

const createThesis = async (req, res) => {
    try {

        const data = {
            ...req.body,
            keywords: JSON.parse(req.body.keywords),
            pdfUrl: req.file?.path
        };

        const new_thesis = new Thesis(data);
        await new_thesis.save();
        res.status(201).json({ message: "Thesis successfully created", thesis: new_thesis });
    } catch (error) {
        console.error("Error in the createThesis function:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getAllThesis = async (req, res) => {
    try {
        const { author, supervisor, departmentId, subjectId, degreeType, year } = req.query;
        const filters = {};

        if (year) {
            filters.year = year;
        }
        if (subjectId) {
            filters.subjectId = subjectId;
        }
        if (departmentId) {
            filters.departmentId = departmentId;
        }
        if (author) {
            filters.author = author;
        }
        if (supervisor) {
            filters.supervisor = supervisor;
        }
        if (degreeType) {
            filters.degreeType = degreeType;
        }

        const required_thesis = await Thesis.find(filters);
        res.status(200).json({count: required_thesis.length, required_thesis });
    } catch (error) {
        console.error("Error in the getAllThesis function:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getThesisById = async (req, res) => {
    try {
        const thesis = await Thesis.findById(req.params.id);
        if (!thesis) {
            return res.status(404).json({ message: "Thesis Not found" });
        }
        res.status(200).json({ thesis });
    } catch (error) {
        console.error("Error in the getThesisById function:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteThesis = async (req, res) => {
    try {
        await Thesis.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error in the deleteThesis function:", error);
        res.status(500).json({ message: "Internal Server Error" });    }
};

const updateThesis = async (req, res) => {
    try {
        const thesis = await Thesis.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ thesis });
    } catch (error) {
        console.error("Error in the updateThesis function:", error);
        res.status(500).json({ message: "Internal Server Error" });    
    }
};

module.exports={
    createThesis,
    getAllThesis,
    getThesisById,
    deleteThesis,
    updateThesis
}