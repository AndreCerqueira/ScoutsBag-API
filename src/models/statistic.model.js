var dbConn = require('../../config/db.config');

var Statistic = function(statistic){
    this.id_statistic = statistic.id_statistic;
    this.participation_year = statistic.participation_year;
    this.participation_month = statistic.participation_month;
    this.participation_total = statistic.participation_total;
    this.id_user = statistic.id_user;
}

// get all statistics
Statistic.getAllStatistics = (result) => {
    dbConn.query('SELECT * FROM statistics', (err, res) => {
        if(err){
            console.log("Error while fetching statistics.", err);
            result(err, null);
        }
        else{
            console.log('Statistics fetched successfully.');
            result(null, res);
        }
    })
}

//get statistic by ID from DB
Statistic.getStatisticByID = (id, result) => {
    dbConn.query('SELECT * FROM statistics WHERE id_statistic=?', id, (err, res) => {
        if(err) {
            console.log("Error while fetching statistic by id", err);
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

//create new statistic
Statistic.createNewStatistic = (statisticReqData, result) => {
    dbConn.query('INSERT INTO statistics SET ? ', statisticReqData, (err, res) => {
        if(err)
        {
            console.log('Error while posting statistic data into db.');
            result(null, {status: false, message: err});
        } else {
            console.log("Statistic created successfully.");
            result(null, {status: true, message: 'Statistic created successfully.'});
        }
    })
}

//update statistic
Statistic.updateStatistic = (id, statisticReqData, result) => {
    dbConn.query("UPDATE statistics SET participation_year=?, participation_month=?, participation_total=?, id_user=? WHERE id_statistic=?",
    [statisticReqData.participation_year, statisticReqData.participation_month, statisticReqData.participation_total, statisticReqData.id_user, id],
    (err, res) => {
        if(err) {
            console.log('Error while updating statistic data into db.');
            result(null, {status: false, message: err});
        } else {
            console.log("Statistic updated successfully.");
            result(null, {status: true, message: 'Statistic updated successfully.', insertID: res.id_statistic});
        }
    })
}

//delete statistic
Statistic.deleteStatistic = (id, result) => {
    dbConn.query('DELETE FROM statistics WHERE id_statistic=?', id, (err, res) => {
        if(err) {
            console.log("Error while deleting statistic by id", err);
            result(null, err);
        } else {
            result(null, res)
        }
    })
}

module.exports = Statistic;