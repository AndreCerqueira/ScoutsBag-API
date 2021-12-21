const express = require('express');
const router = express.Router();

const participationController = require('../controllers/participation.controller');

//get all activitiesInvites
router.get('/', participationController.getAllParticipations);

//get activitiesInvites by id_activity
router.get('/:idActivity', participationController.getParticipationByID);

//create a new activitiesInvites
router.post('/', participationController.createNewParticipation);

//update a activitiesInvites
router.put('/:idActivity/:idUser', participationController.updateParticipation);

//delete a activitiesInvites
router.delete('/:idActivity/:idUser', participationController.deleteParticipation);

module.exports = router;