const activitiesTeamsModel = require('../models/activitiesTeams.model');

// get all activitiesTeams list
exports.getAllActivities_Teams = (req, res) => {
    activitiesTeamsModel.getAllActivities_Teams((err, activitiesTeams) => {
        if(err){
            res.send(err);
        } else {
            res.send(activitiesTeams);
        }
    })
}


//get activitiesTeams from id_activity
exports.getActivities_TeamByID = (req, res) => {
    activitiesTeamsModel.getActivities_TeamByID(req.params.idActivity, (err, activitiesTeams) => {
        if(err){
            res.send(err);
        } else {
            res.send(activitiesTeams);
        }
    })
}

//create new activitiesTeams
exports.createNewActivities_Team = (req, res) => {
    const activitiesTeamsData = new activitiesTeamsModel(req.body);
    activitiesTeamsModel.createNewActivities_Team(activitiesTeamsData, (err, user) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "ActivitiesTeams Created Successfully", data: user});
        }
    })
}

//update a activitiesTeams
exports.updateActivities_Team = (req, res) => {
    const activitiesTeamsData = new activitiesTeamsModel(req.body);
    activitiesTeamsModel.updateActivities_Team(req.params.idActivity, req.params.idTeam, activitiesTeamsData, (err, activity) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "Activities Teams Updated Successfully"});
        }
    })
}

//delete a activitiesTeams
exports.deleteActivities_Team = (req, res) => {
    activitiesTeamsModel.deleteActivities_Team(req.params.idActivity, req.params.idTeam, (err, activitiesTeams) => {
        if(err){
            res.send(err);
        } else {
            res.send(activitiesTeams);
        }
    })
}

//delete activitiesTeams by id activity
exports.deleteActivities_TeamByIdActivity = (req, res) => {
    activitiesTeamsModel.deleteActivities_TeamByIdActivity(req.params.idActivity, (err, activitiesTeams) => {
        if(err){
            console.log("Error while deleting activities_teams by id activity", err);
            res.send(err);
        } else {
            res.send(activitiesTeams);
        }
    })
}