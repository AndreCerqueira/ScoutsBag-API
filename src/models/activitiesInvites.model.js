var dbConn = require('../../config/db.config');

var Activities_Invite = function(activities_Invite){
    this.id_activity = activities_Invite.id_activity;
    this.id_user = activities_Invite.id_user;
    this.accepted_invite = activities_Invite.accepted_invite;
}

// get all activities_invites
Activities_Invite.getAllActivities_Invites = (result) => {
    dbConn.query('SELECT * FROM invites', (err, res) => {
        if(err){
            console.log("Error while fetching activities_invites.", err);
            result(err, null);
        }
        else{
            console.log('activities_invites fetched successfully.');
            result(null, res);
        }
    })
}

//get activities_invites by id_activity from DB
Activities_Invite.getActivities_InviteByID = (idActivity, result) => {
    dbConn.query('SELECT * FROM invites WHERE id_activity=?', idActivity, (err, res) => {
        if(err) {
            console.log("Error while fetching activities_invites by id_activity", err);
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

//create new activities_invites
Activities_Invite.createNewActivities_Invite = (activities_invitesReqData, result) => {
    dbConn.query('INSERT INTO invites SET ? ', activities_invitesReqData, (err, res) => {
        if(err)
        {
            console.log('Error while posting activities_invites data into db. Error: ' + err);
            result(null, {status: false, message: err});
        } else {
            console.log("Activities_Invite created successfully.");
            result(null, {status: true, message: 'Activities_Invite created successfully.'});
        }
    })
}

//update activities_invites
Activities_Invite.updateActivities_Invite = (id_activity, id_user, activitiesInvitesData, result) => {
    dbConn.query("UPDATE invites SET id_activity=?, id_user=?, accepted_invite=? WHERE id_activity=? and id_user=?",
    [activitiesInvitesData.id_activity, activitiesInvitesData.id_user, activitiesInvitesData.accepted_invite, id_activity, id_user],
    (err, res) => {
        if(err) {
            console.log('Error while updating Activities_Invite data into db.');
            result({status: false, message: err}, null);
        } else {
            console.log("Activities_Invite updated successfully.");
            result(null, {status: true, message: 'Activities_Invite updated successfully.'});
        }
    })
}

//delete activities_invites
Activities_Invite.deleteActivities_Invite = (id_activity, id_user, result) => {
    dbConn.query('DELETE FROM invites WHERE id_activity=? AND id_user=?', [id_activity, id_user], (err, res) => {
        if(err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

module.exports = Activities_Invite;