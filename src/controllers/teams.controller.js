const TeamModel = require('../models/team.model');

// get all teams list
exports.getAllTeams = (req, res) => {
    TeamModel.getAllTeams((err, teams) => {
        if(err){
            res.send(err);
        } else {
            res.send(teams);
        }
    })
}


//get team from id
exports.getTeamByID = (req, res) => {
    TeamModel.getTeamByID(req.params.id, (err, team) => {
        if(err){
            res.send(err);
        } else {
            res.send(team);
        }
    })
}

//create new team
exports.createNewTeam = (req, res) => {
    const teamData = new TeamModel(req.body);
    TeamModel.createNewTeam(teamData, (err, team) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "Team Created Successfully", data: team});
        }
    })
}

//update a team
exports.updateTeam = (req, res) => {
    const teamData = new TeamModel(req.body);
    TeamModel.updateTeam(req.params.id, teamData, (err, activity) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "Team Updated Successfully"});
        }
    })
}

//delete a team
exports.deleteTeam = (req, res) => {
    TeamModel.deleteTeam(req.params.id, (err, team) => {
        if(err){
            res.send(err);
        } else {
            res.send(team);
        }
    })
}