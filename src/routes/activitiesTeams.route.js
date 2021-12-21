const express = require('express');
const router = express.Router();

const activitiesTeamsController = require('../controllers/activitiesTeams.controller');

//get all activitiesCatalogs
router.get('/', activitiesTeamsController.getAllActivities_Teams);

//get activitiesCatalogs by id_activity
router.get('/:idActivity', activitiesTeamsController.getActivities_TeamByID);

//create a new activitiesCatalogs
router.post('/', activitiesTeamsController.createNewActivities_Team);

//update a activitiesCatalogs
router.put('/:idActivity/:idTeam', activitiesTeamsController.updateActivities_Team);

//delete a activitiesCatalogs by id activity
router.delete('/:idActivity', activitiesTeamsController.deleteActivities_TeamByIdActivity);

//delete a activitiesCatalogs
router.delete('/:idActivity/:idTeam', activitiesTeamsController.deleteActivities_Team);

module.exports = router;