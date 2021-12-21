const CatalogModel = require('../models/catalog.model');

// get all catalogs list
exports.getAllCatalogs = (req, res) => {
    CatalogModel.getAllCatalogs((err, catalogs) => {
        if(err){
            res.send(err);
        } else {
            res.send(catalogs);
        }
    })
}


//get catalog from id
exports.getCatalogByID = (req, res) => {
    CatalogModel.getCatalogByID(req.params.id, (err, catalog) => {
        if(err){
            res.send(err);
        } else {
            res.send(catalog);
        }
    })
}

//create new catalog
exports.createNewCatalog = (req, res) => {
    const catalogData = new CatalogModel(req.body);
    CatalogModel.createNewCatalog(catalogData, (err, catalog) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "Catalog Created Successfully", data: catalog});
        }
    })
}

//update a catalog
exports.updateCatalog = (req, res) => {
    const catalogData = new CatalogModel(req.body);
    CatalogModel.updateCatalog(req.params.id, catalogData, (err, activity) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "Catalog Updated Successfully"});
        }
    })
}

//delete a catalog
exports.deleteCatalog = (req, res) => {
    CatalogModel.deleteCatalog(req.params.id, (err, catalog) => {
        if(err){
            res.send(err);
        } else {
            res.send(catalog);
        }
    })
}