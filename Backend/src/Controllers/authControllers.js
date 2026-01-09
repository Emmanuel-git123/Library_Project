const {Admin} = require("../../models/Admin");
const {Invite} = require('../../models/Invite');
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "10h"
        }
    )
}

const userLogin = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email||!password){
            return res.status(400).json({message:"Missing required fields"});
        }
        const check_user=await Admin.findOne({email});
        if(!check_user){
            return res.status(404).json({ message: "User not found" });
        }
        const same_pass=await bcrypt.compare(password,check_user.password);
        if(!same_pass){
            return res.status(401).json({message:"Incorrect password"});
        }
        const token=generateToken(check_user);
        res.status(200).json({message:"Login Successfull",token, admin:{username:check_user.username, email:check_user.email}});
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const userRegister = async(req,res)=>{
    try {
        const {username,email,password,inviteToken}=req.body;
        if(!username||!email||!password|| !inviteToken){
            return res.status(400).json({message:"Missing required fields"});
        }
        const invite = await Invite.findOne({
            token: inviteToken,
            used: false,
            expiresAt: { $gt: new Date() }
        });
        if (!invite) {
            return res.status(400).json({ message: "Invalid or expired invite" });
        }
        if (invite.email !== email) {
            return res.status(403).json({ message: "Invite email mismatch" });
        }

        const already_registered=await Admin.findOne({email});
        if(already_registered){
            return res.status(409).json({message:"Email already exists"});
        }
        const hashPass=await bcrypt.hash(password,10);
        const newAdmin=new Admin({username,email,password:hashPass,role: "ADMIN"});
        await newAdmin.save();
        
        invite.used = true;
        await invite.save();
        
        res.status(200).json({message:"Admin successfully created",admin:{username:newAdmin.username,email:newAdmin.email}});
    } catch (error) {
        console.error("Error in creating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const acceptInvite=async(req,res)=>{
    try {
        const {email}=req.body;
        if(!email){
            return res.status(400).json({message:"Email is required"});
        }
        const check_email=await Admin.findOne({email});
        if(check_email){
            return res.status(409).json({message:"Admin with this Email already exists."});
        }
        if (await Invite.findOne({ email, used: false, expiresAt: { $gt: new Date() } })) {
            return res.status(409).json({ message: "Invite already sent" });
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const newInvite = new Invite({email,token,expiresAt,createdBy: req.user.id,});
        await newInvite.save();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", 
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const inviteLink = `${process.env.FRONTEND_URL}/register?inviteToken=${token}`;

        await transporter.sendMail({
        from: `"NITT Library Admin" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "You are invited as Admin",
        html: `<p>You have been invited as an admin. Click the link below to complete your registration:</p>
                <a href="${inviteLink}">Accept Invite</a>
                <p>This link expires in 24 hours.</p>`
        });

        res.status(200).json({ message: "Invite sent successfully" });

    } catch (error) {
        console.error("Error sending invite:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports={
    userLogin,
    userRegister,
    acceptInvite
}
