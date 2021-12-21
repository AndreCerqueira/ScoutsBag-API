const express = require('express');
const router = express.Router();

const materialsController = require('../controllers/materials.controller');

//get all materials
router.get('/', materialsController.getAllMaterials);

//get material by id
router.get('/:id', materialsController.getMaterialByID);

//create a new material
router.post('/', materialsController.createNewMaterial);

//update a material
router.put('/:id', materialsController.updateMaterial);

//delete a material
router.delete('/:id', materialsController.deleteMaterial);

module.exports = router;