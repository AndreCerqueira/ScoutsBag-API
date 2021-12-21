const express = require('express');
const router = express.Router();

const instructionsController = require('../controllers/instructions.controller');

//get all instructions
router.get('/', instructionsController.getAllInstructions);

//get instruction by id
router.get('/:id', instructionsController.getInstructionByID);

//create a new instruction
router.post('/', instructionsController.createNewInstruction);

//update a instruction
router.put('/:id', instructionsController.updateInstruction);

//delete a instruction
router.delete('/:id', instructionsController.deleteInstruction);

module.exports = router;