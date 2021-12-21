const participationModel = require('../models/participation.model');

// get all participations list
exports.getAllParticipations = (req, res) => {
    participationModel.getAllParticipations((err, participations) => {
        if(err){
            res.send(err);
        } else {
            res.send(participations);
        }
    })
}


//get participations from id_activity
exports.getParticipationByID = (req, res) => {
    participationModel.getParticipationByID(req.params.idActivity, (err, participations) => {
        if(err){
            res.send(err);
        } else {
            res.send(participations);
        }
    })
}

//create new participations
exports.createNewParticipation = (req, res) => {
    const participationData = new participationModel(req.body);
    participationModel.createNewParticipation(participationData, (err, user) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "Participation Created Successfully", data: user});
        }
    })
}

//update a participations
exports.updateParticipation = (req, res) => {
    const participationData = new participationModel(req.body);
    participationModel.updateParticipation(req.params.idActivity, req.params.idUser, participationData, (err, participation) => {
        if(err) {
            res.send(err);
        } else {
            res.send(participation);
        }
    })
}

//delete a participations
exports.deleteParticipation = (req, res) => {
    participationModel.deleteParticipation(req.params.idActivity, req.params.idUser, (err, participations) => {
        if(err){
            res.send(err);
        } else {
            res.send(participations);
        }
    })
}