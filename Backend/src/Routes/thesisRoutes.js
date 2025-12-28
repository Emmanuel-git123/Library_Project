const express = require('express');
const upload = require('../../middleware/upload'); 
const { createThesis, getAllThesis, getThesisById, updateThesis, deleteThesis } = require('../Controllers/thesisController');
const router = express.Router();


router.post('/',upload.single('pdf'), createThesis);
router.get('/', getAllThesis);
router.get('/:id', getThesisById);
router.put('/:id', updateThesis);
router.delete('/:id', deleteThesis);

module.exports = router;