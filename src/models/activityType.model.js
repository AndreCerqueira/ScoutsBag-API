var dbConn = require('../../config/db.config');

var ActivityType = function(activityType){
    this.id_type = activityType.id_type;
    this.designation = activityType.designation;
    this.image_url = activityType.image_url;
}

// get all activityTypes
ActivityType.getAllActivityTypes = (result) => {
    dbConn.query('SELECT * FROM activities_types', (err, res) => {
        if(err){
            console.log("Error while fetching activityTypes.", err);
            result(err, null);
        }
        else{
            console.log('ActivityTypes fetched successfully.');
            result(null, res);
        }
    })
}

//get activityType by ID from DB
ActivityType.getActivityTypeByID = (id, result) => {
    dbConn.query('SELECT * FROM activities_types WHERE id_type=?', id, (err, res) => {
        if(err) {
            console.log("Error while fetching activityType by id", err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//create new activityType
ActivityType.createNewActivityType = (activityTypeReqData, result) => {
    dbConn.query('INSERT INTO activities_types SET ? ', activityTypeReqData, (err, res) => {
        if(err)
        {
            console.log('Error while posting activityType data into db.');
            result({status: false, message: err}, null);
        } else {
            console.log("ActivityType created successfully.");
            result(null, {status: true, message: 'ActivityType created successfully.'});
        }
    })
}

//update activityType
ActivityType.updateActivityType = (id, activityTypeReqData, result) => {
    dbConn.query("UPDATE activities_types SET designation=?, image_url=? WHERE id_type=?",
    [activityTypeReqData.designation, activityTypeReqData.image_url, id],
    (err, res) => {
        if(err) {
            console.log('Error while updating activityType data into db.');
            result({status: false, message: err}, null);
        } else {
            console.log("ActivityType updated successfully.");
            result(null, {status: true, message: 'ActivityType updated successfully.', insertID: res.id_activity});
        }
    })
}

//delete activityType activity
ActivityType.deleteActivityType = (id, result) => {
    dbConn.query('DELETE FROM activities_types WHERE id_type=?', id, (err, res) => {
        if(err) {
            console.log("Error while deleting activityType by id", err);
            result(null, err);
        } else {
            result(null, res)
        }
    })
}

module.exports = ActivityType;