const { Thesis } = require("../../models/Thesis")
const upload=require("../../middleware/upload")
const pdf = require('pdf-parse-new');
const {uploadToCloud}=require('../../utils/uploadToCloud')
const keyword_extractor = require("keyword-extractor");
const axios = require('axios');
const { uploadToS3 } = require("../../utils/s3");
const { S3Client } = require("@aws-sdk/client-s3");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config();

const cleanText = (text) => {
  return text.replace(/^\s*(i|ii|iii|iv|v|vi|vii|viii|ix|x)\s*$/gim, "")
    .replace(/^\s*\d+\s*$/gim, "")
    .replace(/\n{3,}/g, "\n\n");
};

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
  const cleaned = cleanText(text);

  const match = cleaned.match(
    /ABSTRACT\s*([\s\S]*?)(?=\bACKNOWLEDGEMENTS\b|\bKEYWORDS\b|\bKeywords\s*:)/i
  );

  if (!match) return null;

  return match[1]
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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
        // const cloudRes = await uploadToCloud(req.file.buffer);
        const s3Key=await uploadToS3(req.file.buffer,req.file.originalname,req.file.mimetype);
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
            pdfUrl: s3Key
        };

        const new_thesis = new Thesis(data);
        await new_thesis.save();

        await User.findByIdAndUpdate(
            req.body.author,
            { $push: { thesis: new_thesis._id } }
        );

        await User.findByIdAndUpdate(
            req.body.supervisor,
            { $push: { thesis: new_thesis._id } }
        );
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

        const required_thesis = await Thesis.find(filters)
            .populate("author", "name ")
            .populate("supervisor", "name")
            .populate("departmentId", "name")
            .populate("subjectId", "name")
            .lean();

        res.status(200).json({count: required_thesis.length, required_thesis });
    } catch (error) {
        console.error("Error in the getAllThesis function:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getThesisById = async (req, res) => {
    try {
        const thesis = await Thesis.findById(req.params.id)
            .populate("author", "name email")
            .populate("supervisor", "name")
            .populate("departmentId", "name")
            .populate("subjectId", "name")
            .lean();

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
const getSignedURL=async(req,res)=>{
    try {
        // console.log("PARAM ID:", req.params.id);
        const thesis=await Thesis.findById(req.params.id);
        if (!thesis) {
            return res.status(404).json({ message: "Thesis not found" });
        }
        const client=new S3Client({ region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
         });
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: thesis.pdfUrl
        });
        const presigned=await getSignedUrl(client,command,{
            expiresIn: 600
        });
        res.json({url:presigned});
    } catch (error) {
        console.error("Error in the getSignedURL:", error);
        res.status(500).json({ message: "Internal Server Error" }); 
    }
}

module.exports={
    createThesis,
    getAllThesis,
    getThesisById,
    deleteThesis,
    updateThesis,
    extractMetadata,
    getSignedURL
}