const activitiesCatalogsModel = require('../models/activitiesCatalogs.model');

// get all activitiesCatalogs list
exports.getAllActivities_Catalogs = (req, res) => {
    activitiesCatalogsModel.getAllActivities_Catalogs((err, activitiesCatalogs) => {
        if(err){
            res.send(err);
        } else {
            res.send(activitiesCatalogs);
        }
    })
}


//get activitiesCatalogs from id_catalog
exports.getActivities_CatalogByID = (req, res) => {
    activitiesCatalogsModel.getActivities_CatalogByID(req.params.idActivity, (err, activitiesCatalogs) => {
        if(err){
            res.send(err);
        } else {
            res.send(activitiesCatalogs);
        }
    })
}

//create new activitiesCatalogs
exports.createNewActivities_Catalog = (req, res) => {
    const activitiesCatalogsData = new activitiesCatalogsModel(req.body);
    activitiesCatalogsModel.createNewActivities_Catalog(activitiesCatalogsData, (err, user) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "ActivitiesCatalogs Created Successfully", data: user});
        }
    })
}

//update a activitiesCatalogs
exports.updateActivities_Catalog = (req, res) => {
    const activitiesCatalogsData = new activitiesCatalogsModel(req.body);
    activitiesCatalogsModel.updateActivities_Catalog(req.params.idActivity, req.params.idCatalog, activitiesCatalogsData, (err, activity) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "Activities Catalogs Updated Successfully"});
        }
    })
}

//delete a activitiesCatalogs
exports.deleteActivities_Catalog = (req, res) => {
    activitiesCatalogsModel.deleteActivities_Catalog(req.params.idActivity, req.params.idCatalog, (err, activitiesCatalogs) => {
        if(err){
            res.send(err);
        } else {
            res.send(activitiesCatalogs);
        }
    })
}