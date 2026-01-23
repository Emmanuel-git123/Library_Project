const express = require('express');
const upload = require('../../middleware/upload'); 
const authMiddleware=require('../../middleware/authMiddleware');
const { createThesis, getAllThesis, getThesisById, updateThesis, deleteThesis } = require('../Controllers/thesisController');
const router = express.Router();

router.post('/',authMiddleware, upload.single('pdf') ,createThesis);
router.get('/', getAllThesis);
router.get('/:id', getThesisById);
router.put('/:id', authMiddleware, updateThesis);
router.delete('/:id', authMiddleware ,deleteThesis);

module.exports = router;