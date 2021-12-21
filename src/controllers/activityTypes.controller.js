const ActivityTypesModel = require('../models/activityType.model');

// get all activityTypes list
exports.getAllActivityTypes = (req, res) => {
    ActivityTypesModel.getAllActivityTypes((err, activityTypes) => {
        if(err){
            res.send(err);
        } else {
            res.send(activityTypes);
        }
    })
}


//get activityTypes from id
exports.getActivityTypeByID = (req, res) => {
    ActivityTypesModel.getActivityTypeByID(req.params.id, (err, user) => {
        if(err){
            res.send(err);
        } else {
            res.send(user);
        }
    })
}

//create new activityType
exports.createNewActivityType = (req, res) => {
    const activityTypeData = new ActivityTypesModel(req.body);
    ActivityTypesModel.createNewActivityType(activityTypeData, (err, user) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "Activity type created Successfully", data: user});
        }
    })
}

//update a activityType
exports.updateActivityType = (req, res) => {
    const activityTypeData = new ActivityTypesModel(req.body);
    ActivityTypesModel.updateActivityType(req.params.id, activityTypeData, (err, activity) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "User Updated Successfully"});
        }
    })
}

//delete a activityType
exports.deleteActivityType = (req, res) => {
    ActivityTypesModel.deleteActivityType(req.params.id, (err, user) => {
        if(err){
            res.send(err);
        } else {
            res.send(user);
        }
    })
}