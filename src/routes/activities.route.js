const express = require('express');
const router = express.Router();

const activitiesController = require('../controllers/activities.controller');

//get all activities
router.get('/', activitiesController.getActivitiesList);

//get activity by id
router.get('/:id', activitiesController.getActivityByID);

//create a new activity
router.post('/', activitiesController.createNewActivity);

//update an activity
router.put('/:id', activitiesController.updateActivity);

//delete an activity
router.delete('/:id', activitiesController.deleteActivity);

module.exports = router;