const express=require('express');
const router=express.Router();
const {userLogin,userRegister,acceptInvite}=require('../Controllers/authControllers');
const authMiddleware  = require('../../middleware/authMiddleware');
const requireHeadAdmin  = require('../../middleware/requireHeadAdmin');

router.post("/login", userLogin);
router.post("/register", userRegister);
router.post("/accept-invite",authMiddleware,requireHeadAdmin,acceptInvite);

module.exports=router;
