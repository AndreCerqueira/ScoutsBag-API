const express = require('express');
const router = express.Router();

const statisticsController = require('../controllers/statistics.controller');

//get all statistics
router.get('/', statisticsController.getAllStatistics);

//get statistic by id
router.get('/:id', statisticsController.getStatisticByID);

//create a new statistic
router.post('/', statisticsController.createNewStatistic);

//update a statistic
router.put('/:id', statisticsController.updateStatistic);

//delete a statistic
router.delete('/:id', statisticsController.deleteStatistic);

module.exports = router;