const InstructionModel = require('../models/instruction.model');

// get all instructions list
exports.getAllInstructions = (req, res) => {
    InstructionModel.getAllInstructions((err, instructions) => {
        if(err){
            res.send(err);
        } else {
            res.send(instructions);
        }
    })
}


//get instruction from id
exports.getInstructionByID = (req, res) => {
    InstructionModel.getInstructionByID(req.params.id, (err, instruction) => {
        if(err){
            res.send(err);
        } else {
            res.send(instruction);
        }
    })
}

//create new instruction
exports.createNewInstruction = (req, res) => {
    const instructionData = new InstructionModel(req.body);
    InstructionModel.createNewInstruction(instructionData, (err, instruction) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "Instruction Created Successfully", data: instruction});
        }
    })
}

//update a instruction
exports.updateInstruction = (req, res) => {
    const instructionData = new InstructionModel(req.body);
    InstructionModel.updateInstruction(req.params.id, instructionData, (err, activity) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "Instruction Updated Successfully"});
        }
    })
}

//delete a instruction
exports.deleteInstruction = (req, res) => {
    InstructionModel.deleteInstruction(req.params.id, (err, instruction) => {
        if(err){
            res.send(err);
        } else {
            res.send(instruction);
        }
    })
}