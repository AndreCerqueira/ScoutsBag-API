var dbConn = require('../../config/db.config');

var Catalog = function(catalog){
    this.id_catalog = catalog.id_catalog;
    this.name_catalog = catalog.name_catalog;
    this.catalog_description = catalog.catalog_description;
    this.classification = catalog.classification;
    this.instructions_time = catalog.instructions_time;
    this.image_url = catalog.image_url;
}

// get all catalogs
Catalog.getAllCatalogs = (result) => {
    dbConn.query('SELECT * FROM catalogs', (err, res) => {
        if(err){
            console.log("Error while fetching activities.", err);
            result(err, null);
        }
        else{
            console.log('Activities fetched successfully.');
            result(null, res);
        }
    })
}

//get catalog by ID from DB
Catalog.getCatalogByID = (id, result) => {
    dbConn.query('SELECT * FROM catalogs WHERE id_catalog=?', id, (err, res) => {
        if(err) {
            console.log("Error while fetching catalog by id", err);
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

//create new catalog
Catalog.createNewCatalog = (catalogReqData, result) => {
    dbConn.query('INSERT INTO catalogs SET ? ', catalogReqData, (err, res) => {
        if(err)
        {
            console.log('Error while posting catalog data into db.');
            result(null, {status: false, message: err});
        } else {
            console.log("Catalog created successfully.");
            result(null, {status: true, message: 'Catalog created successfully.'});
        }
    })
}

//update catalog
Catalog.updateCatalog = (id, catalogReqData, result) => {
    dbConn.query("UPDATE catalogs SET name_catalog=?, catalog_description=?, classification=?, instructions_time=?, image_url=? WHERE id_catalog=?",
    [catalogReqData.name_catalog, catalogReqData.catalog_description, catalogReqData.classification, catalogReqData.instructions_time, catalogReqData.image_url, id],
    (err, res) => {
        if(err) {
            console.log('Error while updating catalog data into db.');
            result(null, {status: false, message: err});
        } else {
            console.log("Catalog updated successfully.");
            result(null, {status: true, message: 'Catalog updated successfully.', insertID: res.id_activity});
        }
    })
}

//Delete catalog
Catalog.deleteCatalog = (id, result) => {
    dbConn.query('DELETE FROM catalogs WHERE id_catalog=?', id, (err, res) => {
        if(err) {
            console.log("Error while deleting catalog by id", err);
            result(null, err);
        } else {
            result(null, res)
        }
    })
}

module.exports = Catalog;