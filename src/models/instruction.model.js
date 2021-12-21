var dbConn = require('../../config/db.config');

var Instruction = function(instruction){
    this.id_instruction = instruction.id_instruction;
    this.instruction_text = instruction.instruction_text;
    this.image_url = instruction.image_url;
    this.id_catalog = instruction.id_catalog;
}

// get all instructions
Instruction.getAllInstructions = (result) => {
    dbConn.query('SELECT * FROM instructions', (err, res) => {
        if(err){
            console.log("Error while fetching instructions.", err);
            result(err, null);
        }
        else{
            console.log('Instructions fetched successfully.');
            result(null, res);
        }
    })
}

//get instruction by ID from DB
Instruction.getInstructionByID = (id, result) => {
    dbConn.query('SELECT * FROM instructions WHERE id_instruction=?', id, (err, res) => {
        if(err) {
            console.log("Error while fetching instruction by id", err);
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

//create new instruction
Instruction.createNewInstruction = (instructionReqData, result) => {
    dbConn.query('INSERT INTO instructions SET ? ', instructionReqData, (err, res) => {
        if(err)
        {
            console.log('Error while posting instruction data into db.');
            result(null, {status: false, message: err});
        } else {
            console.log("Instruction created successfully.");
            result(null, {status: true, message: 'Instruction created successfully.'});
        }
    })
}

//update instruction
Instruction.updateInstruction = (id, instructionReqData, result) => {
    dbConn.query("UPDATE instructions SET instruction_text=?, image_url=?, id_catalog=? WHERE id_instruction=?",
    [instructionReqData.instruction_text, instructionReqData.image_url, instructionReqData.id_catalog, id],
    (err, res) => {
        if(err) {
            console.log('Error while updating instruction data into db.');
            result(null, {status: false, message: err});
        } else {
            console.log("Instruction updated successfully.");
            result(null, {status: true, message: 'Instruction updated successfully.', insertID: res.id_instruction});
        }
    })
}

//delete instruction
Instruction.deleteInstruction = (id, result) => {
    dbConn.query('DELETE FROM instructions WHERE id_instruction=?', id, (err, res) => {
        if(err) {
            console.log("Error while deleting instruction by id", err);
            result(null, err);
        } else {
            result(null, res)
        }
    })
}

module.exports = Instruction;