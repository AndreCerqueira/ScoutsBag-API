const express = require('express');
const router = express.Router();

const teamsController = require('../controllers/teams.controller');

//get all teams
router.get('/', teamsController.getAllTeams);

//get team by id
router.get('/:id', teamsController.getTeamByID);

//create a new team
router.post('/', teamsController.createNewTeam);

//update a team
router.put('/:id', teamsController.updateTeam);

//delete a team
router.delete('/:id', teamsController.deleteTeam);

module.exports = router;