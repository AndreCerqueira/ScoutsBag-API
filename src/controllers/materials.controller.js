const MaterialModel = require('../models/material.model');

// get all materials list
exports.getAllMaterials = (req, res) => {
    MaterialModel.getAllMaterials((err, materials) => {
        if(err){
            res.send(err);
        } else {
            res.send(materials);
        }
    })
}


//get material from id
exports.getMaterialByID = (req, res) => {
    MaterialModel.getMaterialByID(req.params.id, (err, material) => {
        if(err){
            res.send(err);
        } else {
            res.send(material);
        }
    })
}

//create new material
exports.createNewMaterial = (req, res) => {
    const materialData = new MaterialModel(req.body);
    MaterialModel.createNewMaterial(materialData, (err, material) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "Material Created Successfully", data: material});
        }
    })
}

//update a material
exports.updateMaterial = (req, res) => {
    const materialData = new MaterialModel(req.body);
    MaterialModel.updateMaterial(req.params.id, materialData, (err, activity) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "Material Updated Successfully"});
        }
    })
}

//delete a material
exports.deleteMaterial = (req, res) => {
    MaterialModel.deleteMaterial(req.params.id, (err, material) => {
        if(err){
            res.send(err);
        } else {
            res.send(material);
        }
    })
}