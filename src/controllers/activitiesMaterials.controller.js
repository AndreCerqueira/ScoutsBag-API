const activitiesMaterialModel = require('../models/activitiesMaterials.model');

// get all activitiesMaterials list
exports.getAllActivities_Materials = (req, res) => {
    activitiesMaterialModel.getAllActivities_Materials((err, activitiesMaterials) => {
        if(err){
            res.send(err);
        } else {
            res.send(activitiesMaterials);
        }
    })
}


//get activitiesMaterials from id_catalog
exports.getActivities_MaterialByID = (req, res) => {
    activitiesMaterialModel.getActivities_MaterialByID(req.params.idActivity, (err, activitiesMaterials) => {
        if(err){
            res.send(err);
        } else {
            res.send(activitiesMaterials);
        }
    })
}

//create new activitiesMaterials
exports.createNewActivities_Material = (req, res) => {
    const activitiesMaterialsData = new activitiesMaterialModel(req.body);
    activitiesMaterialModel.createNewActivities_Material(activitiesMaterialsData, (err, user) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "ActivitiesMaterials Created Successfully", data: user});
        }
    })
}

//update a activitiesMaterials
exports.updateActivities_Material = (req, res) => {
    const activitiesMaterialsData = new activitiesMaterialModel(req.body);
    activitiesMaterialModel.updateActivities_Material(req.params.idActivity, req.params.idMaterial, activitiesMaterialsData, (err, activity) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "ActivitiesMaterials Updated Successfully"});
        }
    })
}

//delete a activitiesMaterials
exports.deleteActivities_Material = (req, res) => {
    activitiesMaterialModel.deleteActivities_Material(req.params.idActivity, req.params.idMaterial, (err, activitiesMaterials) => {
        if(err){
            res.send(err);
        } else {
            res.status(200).send(activitiesMaterials);
        }
    })
}