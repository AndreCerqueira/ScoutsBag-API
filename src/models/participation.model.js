var dbConn = require('../../config/db.config');

var Participation = function(participation){
    this.id_activity = participation.id_activity;
    this.id_user = participation.id_user;
    this.participated = participation.participated;
}


// get all participations
Participation.getAllParticipations = (result) => {
    dbConn.query('SELECT * FROM participation', (err, res) => {
        if(err){
            console.log("Error while fetching participations.", err);
            result(err, null);
        }
        else{
            console.log('participations fetched successfully.');
            result(null, res);
        }
    })
}

//get participations by id_activity from DB
Participation.getParticipationByID = (idActivity, result) => {
    dbConn.query('SELECT * FROM participation WHERE id_activity=?', idActivity, (err, res) => {
        if(err) {
            console.log("Error while fetching participations by id_activity", err);
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

//create new participations
Participation.createNewParticipation = (participationsReqData, result) => {
    dbConn.query('INSERT INTO participation SET ? ', participationsReqData, (err, res) => {
        if(err){
            console.log('Error while posting participations data into db.');
            result(null, {status: false, message: err});
        } else {
            console.log("Participation created successfully.");
            result(null, {status: true, message: 'Participation created successfully.'});
        }
    })
}

//update participations
Participation.updateParticipation = (id_activity, id_user, ParticipationData, result) => {
    dbConn.query("UPDATE participation SET id_activity=?, id_user=?, participated=? WHERE id_activity=? and id_user=?",
    [ParticipationData.id_activity, ParticipationData.id_user, ParticipationData.participated, id_activity, id_user],
    (err, res) => {
        if(err) {
            console.log('Error while updating Activities_Invite data into db.');
            result({status: false, message: err}, null);
        } else {
            console.log("Participation updated successfully.");
            result(null, {status: true, message: 'Participation updated successfully.'});
        }
    })
}

//delete participations
Participation.deleteParticipation = (id_activity, id_user, result) => {
    dbConn.query('DELETE FROM participation WHERE id_activity=? AND id_user=?', [id_activity, id_user], (err, res) => {
        if(err) {
            console.log("Error while deleting participation by id", err);
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

module.exports = Participation;