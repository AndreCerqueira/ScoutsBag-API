const express = require('express');
const router = express.Router();

const activitiesCatalogsController = require('../controllers/activitiesCatalogs.controller');

//get all activitiesCatalogs
router.get('/', activitiesCatalogsController.getAllActivities_Catalogs);

//get activitiesCatalogs by id_activity
router.get('/:idActivity', activitiesCatalogsController.getActivities_CatalogByID);

//create a new activitiesCatalogs
router.post('/', activitiesCatalogsController.createNewActivities_Catalog);

//update a activitiesCatalogs
router.put('/:idActivity/:idCatalog', activitiesCatalogsController.updateActivities_Catalog);

//delete a activitiesCatalogs
router.delete('/:idActivity/:idCatalog', activitiesCatalogsController.deleteActivities_Catalog);

module.exports = router;