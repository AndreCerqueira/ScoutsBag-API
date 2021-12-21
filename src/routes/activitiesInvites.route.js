const express = require('express');
const router = express.Router();

const activitiesInvitesController = require('../controllers/activitiesInvites.controller');

//get all activitiesInvites
router.get('/', activitiesInvitesController.getAllActivities_Invites);

//get activitiesInvites by id_activity
router.get('/:idActivity', activitiesInvitesController.getActivities_InviteByID);

//create a new activitiesInvites
router.post('/', activitiesInvitesController.createNewActivities_Invite);

//update a activitiesInvites
router.put('/:idActivity/:idUser', activitiesInvitesController.updateActivities_Invite);

//delete a activitiesInvites
router.delete('/:idActivity/:idUser', activitiesInvitesController.deleteActivities_Invite);

module.exports = router;