const express = require('express');
const router = express.Router();

const activityTypeController = require('../controllers/activityTypes.controller');

//get all activityType
router.get('/', activityTypeController.getAllActivityTypes);

//get activityType by id
router.get('/:id', activityTypeController.getActivityTypeByID);

//create a new activityType
router.post('/', activityTypeController.createNewActivityType);

//update a activityType
router.put('/:id', activityTypeController.updateActivityType);

//delete a activityType
router.delete('/:id', activityTypeController.deleteActivityType);

module.exports = router;