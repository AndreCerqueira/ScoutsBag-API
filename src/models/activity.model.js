var dbConn = require('../../config/db.config');

var Activity = function(activity){
    this.id_activity = activity.id_activity;
    this.name_activity = activity.name_activity;
    this.id_type = activity.id_type;
    this.activity_description = activity.activity_description;
    this.activity_site = activity.activity_site;
    this.start_date = activity.start_date;
    this.finish_date = activity.finish_date;
    this.gps_coordinates = activity.gps_coordinates;
    this.start_site = activity.start_site;
    this.finish_site = activity.finish_site;
    this.price = activity.price;
}

// get all activities
Activity.getAllActivities = (result) => {
    dbConn.query('SELECT * FROM activities', (err, res) => {
        if(err){
            console.log("Error while fetching activities.", err);
            result(err, null);
        }
        else{
            console.log('Activities fetched successfully.');
            result(null, res);
        }
    })
}

//get activity by ID from DB
Activity.getActivityByID = (id, result) => {
    dbConn.query('SELECT * FROM activities WHERE id_activity=?', id, (err, res) => {
        if(err) {
            console.log("Error while fetching activity by id", err);
            result(null, err);
        } else {
            result(null, res)
        }
    })
}

//create new activity
Activity.createNewActivity = (activityReqData, result) => {
    dbConn.query('INSERT INTO activities SET ? ', activityReqData, (err, res) => {
        if(err)
        {
            console.log('Error while posting activity data into db. Error: ' + err);
            result(null, {status: false, message: err});
        } else {
            console.log("Activity created successfully.");
            result(null, {status: true, message: 'Activity created successfully.', insertID: res.id_activity});
        }
    })
}

//update activity
Activity.updateActivity = (id, activityReqData, result) => {
    dbConn.query("UPDATE activities SET name_activity=?, id_type=?, activity_description=?, activity_site=?, start_date=?, finish_date=?, gps_coordinates=?, start_site=?, finish_site=?, price=? WHERE id_activity=?",
    [activityReqData.name_activity, activityReqData.id_type, activityReqData.activity_description, activityReqData.activity_site,
    activityReqData.start_date, activityReqData.finish_date, activityReqData.gps_coordinates, activityReqData.start_site,
    activityReqData.finish_site, activityReqData.price, id],
    (err, res) => {
        if(err) {
            console.log('Error while updating activity data into db.');
            result(null, {status: false, message: err});
        } else {
            console.log("Activity updated successfully.");
            result(null, {status: true, message: 'Activity updated successfully.', insertID: res.id_activity});
        }
    })
}

//delete activity
Activity.deleteActivity = (id, result) => {
    dbConn.query('DELETE FROM activities WHERE id_activity=?', id, (err, res) => {
        if(err) {
            console.log("Error while deleting activity by id", err);
            result(null, err);
        } else {
            result(null, res)
        }
    })
}

module.exports = Activity;