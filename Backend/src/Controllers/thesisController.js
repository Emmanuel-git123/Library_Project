const { Thesis } = require("../../models/Thesis")
const upload=require("../../middleware/upload")
const pdf = require('pdf-parse-new');
const {uploadToCloud}=require('../../utils/uploadToCloud')
const keyword_extractor = require("keyword-extractor");
const axios = require('axios');

const generateKeywordsFromAbstract = (abstract) => {
  const keywords = keyword_extractor.extract(abstract, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  });

  return keywords.slice(0, 8);
};

const extractAbstract = (text) => {
  const match = text.match(
    /ABSTRACT\s*([\s\S]*?)(?:Keywords\s*:|CHAPTER\s+1|INTRODUCTION|\n\s*\n|$)/i
  );

  if (!match) return null;

  return match[1].trim();
};

const extractTitle = (text) => {
  const match = text.match(/^(.*?)(?=\s*A\s+THESIS|\s*A\s+DISSERTATION)/is);
  if (!match) return null;

  return match[1]
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const extractDegree = (text) => {
  const match = text.match(/for the award of the degree\s*of\s*(.*?)(?=\n|$)/i);
  if (!match) return null;

  return match[1]
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const extractYear = (text) => {
  const matches = text.match(/\b(19|20)\d{2}\b/g);
  if (!matches) return null;

  return matches[matches.length - 1]; 
};

const extractKeywordsFromText = (text) => {
  const match = text.match(/Keywords\s*:\s*(.*)/i);
  if (!match) return null;

  return match[1]
    .split(',')
    .map(k => k.trim())
    .filter(Boolean);
};



const extractMetadata = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "PDF file is required" });
        }
        const buffer=req.file.buffer;
        const data = await pdf(buffer);
        const text=data.text;

        const abstract=extractAbstract(text);

        let keywords = extractKeywordsFromText(text);

        if (!keywords && abstract) {
            keywords = generateKeywordsFromAbstract(abstract);
        }

        const title = extractTitle(text);
        const degreeType = extractDegree(text);
        const year = extractYear(text);

        res.status(200).json({abstract,keywords,title,degreeType,year});
        
        // const cloudRes = await uploadToCloud(buffer);
        // res.status(200).json({extractedData, pdfUrl: cloudRes.secure_url});
    } catch (error) {
        console.error("Error extracting metadata:", error);
        res.status(500).json({ message: "Metadata extraction failed" });
    }
};

const createThesis = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "PDF file is required" });
        }
        const cloudRes = await uploadToCloud(req.file.buffer);
        const data = {
            title: req.body.title,
            abstract: req.body.abstract,
            author: req.body.author,
            supervisor: req.body.supervisor,
            departmentId: req.body.departmentId,
            subjectId: req.body.subjectId || null,
            degreeType: req.body.degreeType,
            year: Number(req.body.year),
            keywords: req.body.keywords ? JSON.parse(req.body.keywords) : [],
            pdfUrl: cloudRes.secure_url
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
const viewPDF=async(req,res)=>{
    try {
        const thesis = await Thesis.findById(req.params.id);
        if (!thesis){
            return res.status(404).json({message:"Thesis not found"});
        }
        console.log("PDF URL:", thesis.pdfUrl); 
        const pdfUrl = thesis.pdfUrl;
        const response =await axios.get(pdfUrl, { responseType: 'stream' });
        console.log("Cloudinary response status:", response.status);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="thesis.pdf"');

        response.data.pipe(res);
    } catch (error) {
         console.error("Full error:", error.message);
        console.error("Error streaming PDF:", error);
        res.status(500).send("Error streaming PDF");
    }
}

module.exports={
    createThesis,
    getAllThesis,
    getThesisById,
    deleteThesis,
    updateThesis,
    extractMetadata,
    viewPDF
    
}