const StatisticModel = require('../models/statistic.model');

// get all statistics list
exports.getAllStatistics = (req, res) => {
    StatisticModel.getAllStatistics((err, statistics) => {
        if(err){
            res.send(err);
        } else {
            res.send(statistics);
        }
    })
}


//get statistic from id
exports.getStatisticByID = (req, res) => {
    StatisticModel.getStatisticByID(req.params.id, (err, statistic) => {
        if(err){
            res.send(err);
        } else {
            res.send(statistic);
        }
    })
}

//create new statistic
exports.createNewStatistic = (req, res) => {
    const statisticData = new StatisticModel(req.body);
    StatisticModel.createNewStatistic(statisticData, (err, statistic) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "Statistic Created Successfully", data: statistic});
        }
    })
}

//update a statistic
exports.updateStatistic = (req, res) => {
    const statisticData = new StatisticModel(req.body);
    StatisticModel.updateStatistic(req.params.id, statisticData, (err, activity) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "Statistic Updated Successfully"});
        }
    })
}

//delete a statistic
exports.deleteStatistic = (req, res) => {
    StatisticModel.deleteStatistic(req.params.id, (err, statistic) => {
        if(err){
            res.send(err);
        } else {
            res.send(statistic);
        }
    })
}