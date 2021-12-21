var dbConn = require('../../config/db.config');

var Activities_Catalog = function(catalog){
    this.id_catalog = catalog.id_catalog;
    this.id_activity = catalog.id_activity;
}

// get all activities_catalogs
Activities_Catalog.getAllActivities_Catalogs = (result) => {
    dbConn.query('SELECT * FROM activities_catalogs', (err, res) => {
        if(err){
            console.log("Error while fetching activities_catalogs.", err);
            result(err, null);
        }
        else{
            console.log('activities_catalogs fetched successfully.');
            result(null, res);
        }
    })
}

//get activities_catalogs by id_activity from DB
Activities_Catalog.getActivities_CatalogByID = (idActivity, result) => {
    dbConn.query('SELECT * FROM activities_catalogs WHERE id_activity=?', idActivity, (err, res) => {
        if(err) {
            console.log("Error while fetching activities_catalogs by id_activity", err);
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

//create new activities_catalogs
Activities_Catalog.createNewActivities_Catalog = (activities_catalogsReqData, result) => {
    dbConn.query('INSERT INTO activities_catalogs SET ? ', activities_catalogsReqData, (err, res) => {
        if(err)
        {
            console.log('Error while posting activities_catalogs data into db.');
            result(null, {status: false, message: err});
        } else {
            console.log("Activities_Catalog created successfully.");
            result(null, {status: true, message: 'Activities_Catalog created successfully.'});
        }
    })
}

//update activities_catalogs
Activities_Catalog.updateActivities_Catalog = (id_activity, id_catalog, activitiesCatalogsData, result) => {
    dbConn.query("UPDATE activities_catalogs SET id_activity=?, id_catalog=? WHERE id_activity=? and id_catalog=?",
    [activitiesCatalogsData.id_activity, activitiesCatalogsData.id_catalog, id_activity, id_catalog],
    (err, res) => {
        if(err) {
            console.log('Error while updating Activities_Catalog data into db.');
            result({status: false, message: err}, null);
        } else {
            console.log("Activities_Catalog updated successfully.");
            result(null, {status: true, message: 'Activities_Catalog updated successfully.', insertID: res.id_activity});
        }
    })
}

//delete activities_catalogs
Activities_Catalog.deleteActivities_Catalog = (id_activity, id_catalog, result) => {
        dbConn.query('DELETE FROM activities_catalogs WHERE id_activity=? AND id_catalog=?', [id_activity, id_catalog], (err, res) => {
        if(err) {
            console.log("Error while deleting activities_catalogs by id", err);
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

module.exports = Activities_Catalog;