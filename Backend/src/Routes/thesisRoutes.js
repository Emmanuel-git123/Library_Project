const express = require('express');
const upload = require('../../middleware/upload'); 
const authMiddleware=require('../../middleware/authMiddleware');
const { createThesis, getAllThesis, getThesisById, getSignedURL, updateThesis, deleteThesis, extractMetadata } = require('../Controllers/thesisController');
const router = express.Router();

router.post('/extract',authMiddleware,upload.single('pdf'),extractMetadata );
router.post('/create',authMiddleware,upload.single('pdf'), createThesis);

router.get('/pdf/:id',getSignedURL);
router.get('/', getAllThesis);
router.get('/:id', getThesisById);

router.put('/:id', authMiddleware, updateThesis);
router.delete('/:id', authMiddleware ,deleteThesis);

module.exports = router;