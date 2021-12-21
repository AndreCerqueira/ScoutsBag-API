const ActivityModel = require('../models/activity.model');

// get all activities list
exports.getActivitiesList = (req, res) => {
    ActivityModel.getAllActivities((err, activities) => {
        if(err){
            res.send(err);
        } else {
            res.send(activities);
        }
    })
}

//get activity from id
exports.getActivityByID = (req, res) => {
    ActivityModel.getActivityByID(req.params.id, (err, activity) => {
        if(err){
            res.send(err);
        } else {
            res.send(activity);
        }
    })
}

//create new activity
exports.createNewActivity = (req, res) => {
    const activityData = new ActivityModel(req.body);
    ActivityModel.createNewActivity(activityData, (err, activity) => {
        if(err)
        {
            res.send(err);
        } else {
            res.json({status: true, message: "Activity Created Successfully", data: activity});
        }
    })
}

//update an activity
exports.updateActivity = (req, res) => {
    const activityData = new ActivityModel(req.body);
    ActivityModel.updateActivity(req.params.id, activityData, (err, activity) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "Activity Updated Successfully"});
        }
    })
}

//delete an activity
exports.deleteActivity = (req, res) => {
    ActivityModel.deleteActivity(req.params.id, (err, activity) => {
        if(err){
            res.send(err);
        } else {
            res.send(activity);
        }
    })
}