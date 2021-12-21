const express = require('express');
const router = express.Router();

const catalogsController = require('../controllers/catalogs.controller');

//get all catalogs
router.get('/', catalogsController.getAllCatalogs);

//get catalog by id
router.get('/:id', catalogsController.getCatalogByID);

//create a new catalog
router.post('/', catalogsController.createNewCatalog);

//update a catalog
router.put('/:id', catalogsController.updateCatalog);

//delete a catalog
router.delete('/:id', catalogsController.deleteCatalog);

module.exports = router;