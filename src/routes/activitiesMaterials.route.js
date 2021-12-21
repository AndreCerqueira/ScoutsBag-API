const express = require('express');
const router = express.Router();

const activitiesMaterialsController = require('../controllers/activitiesMaterials.controller');

//get all activitiesMaterials
router.get('/', activitiesMaterialsController.getAllActivities_Materials);

//get activitiesMaterials by id_activity
router.get('/:idActivity', activitiesMaterialsController.getActivities_MaterialByID);

//create a new activitiesMaterials
router.post('/', activitiesMaterialsController.createNewActivities_Material);

//update a activitiesMaterials
router.put('/:idActivity/:idMaterial', activitiesMaterialsController.updateActivities_Material);

//delete a activitiesMaterials
router.delete('/:idActivity/:idMaterial', activitiesMaterialsController.deleteActivities_Material);

module.exports = router;