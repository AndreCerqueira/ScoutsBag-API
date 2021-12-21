var dbConn = require('../../config/db.config');

var Team = function(team){
    this.id_team = team.id_team;
    this.team_name = team.team_name;
    this.id_section = team.id_section;
}

// get all teams
Team.getAllTeams = (result) => {
    dbConn.query('SELECT * FROM teams', (err, res) => {
        if(err){
            console.log("Error while fetching teams.", err);
            result(err, null);
        }
        else{
            console.log('Teams fetched successfully.');
            result(null, res);
        }
    })
}

//get team by ID from DB
Team.getTeamByID = (id, result) => {
    dbConn.query('SELECT * FROM teams WHERE id_team=?', id, (err, res) => {
        if(err) {
            console.log("Error while fetching team by id", err);
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

//create new team
Team.createNewTeam = (teamReqData, result) => {
    dbConn.query('INSERT INTO teams SET ? ', teamReqData, (err, res) => {
        if(err)
        {
            console.log('Error while posting team data into db.');
            result(null, {status: false, message: err});
        } else {
            console.log("Team created successfully.");
            result(null, {status: true, message: 'Team created successfully.'});
        }
    })
}

//update team
Team.updateTeam = (id, teamReqData, result) => {
    dbConn.query("UPDATE teams SET team_name=?, id_section=? WHERE id_team=?",
    [teamReqData.team_name, teamReqData.id_section, id],
    (err, res) => {
        if(err) {
            console.log('Error while updating team data into db.');
            result(null, {status: false, message: err});
        } else {
            console.log("Team updated successfully.");
            result(null, {status: true, message: 'Team updated successfully.', insertID: res.id_team});
        }
    })
}

//delete team
Team.deleteTeam = (id, result) => {
    dbConn.query('DELETE FROM teams WHERE id_team=?', id, (err, res) => {
        if(err) {
            console.log("Error while deleting team by id", err);
            result(null, err);
        } else {
            result(null, res)
        }
    })
}

module.exports = Team;