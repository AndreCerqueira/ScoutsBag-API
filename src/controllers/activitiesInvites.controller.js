const activitiesInvitesModel = require('../models/activitiesInvites.model');

// get all activitiesInvites list
exports.getAllActivities_Invites = (req, res) => {
    activitiesInvitesModel.getAllActivities_Invites((err, activitiesInvites) => {
        if(err){
            res.send(err);
        } else {
            res.send(activitiesInvites);
        }
    })
}


//get activitiesInvites from id_catalog
exports.getActivities_InviteByID = (req, res) => {
    activitiesInvitesModel.getActivities_InviteByID(req.params.idActivity, (err, activitiesInvites) => {
        if(err){
            res.send(err);
        } else {
            res.send(activitiesInvites);
        }
    })
}

//create new activitiesInvites
exports.createNewActivities_Invite = (req, res) => {
    const activitiesInvitesData = new activitiesInvitesModel(req.body);
    activitiesInvitesModel.createNewActivities_Invite(activitiesInvitesData, (err, user) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "ActivitiesInvites Created Successfully", data: user});
        }
    })
}

//update a activitiesInvites
exports.updateActivities_Invite = (req, res) => {
    const activitiesInvitesData = new activitiesInvitesModel(req.body);
    activitiesInvitesModel.updateActivities_Invite(req.params.idActivity, req.params.idUser, activitiesInvitesData, (err, activity) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "Activities Invites Updated Successfully"});
        }
    })
}

//delete a activitiesInvites
exports.deleteActivities_Invite = (req, res) => {
    activitiesInvitesModel.deleteActivities_Invite(req.params.idActivity, req.params.idUser, (err, activitiesInvites) => {
        if(err){
            res.status(409).send("Failed to delete Activities Invites! Error: " + err);
        } else {
            res.status(200).send("Deleted Activities Invites Successfully!");
        }
    })
}