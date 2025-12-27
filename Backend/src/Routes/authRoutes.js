const express=require('express');
const router=express.Router();
const {userLogin,userForgotPassowrd}=require('../Controllers/authControllers');

router.post("/login", userLogin);
router.post('/forgotPass',userForgotPassowrd);

module.exports=router;
