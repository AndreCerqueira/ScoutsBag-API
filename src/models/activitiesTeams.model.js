var dbConn = require('../../config/db.config');

var Activities_Teams = function(activities_Teams){
    this.id_activity = activities_Teams.id_activity;
    this.id_team = activities_Teams.id_team;
}

// get all activities_teams
Activities_Teams.getAllActivities_Teams = (result) => {
    dbConn.query('SELECT * FROM activities_teams', (err, res) => {
        if(err){
            console.log("Error while fetching activities_teams.", err);
            result(err, null);
        }
        else{
            console.log('activities_teams fetched successfully.');
            result(null, res);
        }
    })
}

//get activities_teams by id_activity from DB
Activities_Teams.getActivities_TeamByID = (idActivity, result) => {
    dbConn.query('SELECT * FROM activities_teams WHERE id_activity=?', idActivity, (err, res) => {
        if(err) {
            console.log("Error while fetching activities_teams by id_activity", err);
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

//create new activities_teams
Activities_Teams.createNewActivities_Team = (activities_teamsReqData, result) => {
    dbConn.query('INSERT INTO activities_teams SET ? ', activities_teamsReqData, (err, res) => {
        if(err)
        {
            console.log('Error while posting activities_teams data into db. Error: ' + err);
            result(null, {status: false, message: err});
        } else {
            console.log("Activities_Teams created successfully.");
            result(null, {status: true, message: 'Activities_Teams created successfully.'});
        }
    })
}

//update activities_teams
Activities_Teams.updateActivities_Team = (id_activity, id_team, activitiesTeamsData, result) => {
    dbConn.query("UPDATE activities_teams SET id_activity=?, id_team=? WHERE id_activity=? and id_team=?",
    [activitiesTeamsData.id_activity, activitiesTeamsData.id_team, id_activity, id_team],
    (err, res) => {
        if(err) {
            console.log('Error while updating Activities_Team data into db.');
            result({status: false, message: err}, null);
        } else {
            console.log("Activities_Team updated successfully.");
            result(null, {status: true, message: 'Activities_Team updated successfully.', insertID: res.id_activity});
        }
    })
}

//delete activities_teams
Activities_Teams.deleteActivities_Team = (id_activity, id_team, result) => {
        dbConn.query('DELETE FROM activities_teams WHERE id_activity=? AND id_team=?', [id_activity, id_team], (err, res) => {
        if(err) {
            console.log("Error while deleting activities_teams by id", err);
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

//delete activities_teams by id activity
Activities_Teams.deleteActivities_TeamByIdActivity = (id_activity, result) => {
    dbConn.query('DELETE FROM activities_teams WHERE id_activity=?', id_activity, (err, res) => {
        if(err) {
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

module.exports = Activities_Teams;