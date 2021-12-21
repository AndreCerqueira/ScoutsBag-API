var dbConn = require('../../config/db.config');

var Activities_Material = function(activities_Materials){
    this.id_activity = activities_Materials.id_activity;
    this.id_material = activities_Materials.id_material;
    this.qnt = activities_Materials.qnt;
}

// get all activities_materials
Activities_Material.getAllActivities_Materials = (result) => {
    dbConn.query('SELECT * FROM activities_materials', (err, res) => {
        if(err){
            console.log("Error while fetching activities_materials.", err);
            result(err, null);
        }
        else{
            console.log('activities_materials fetched successfully.');
            result(null, res);
        }
    })
}

//get activities_materials by id_activity from DB
Activities_Material.getActivities_MaterialByID = (idActivity, result) => {
    dbConn.query('SELECT * FROM activities_materials WHERE id_activity=?', idActivity, (err, res) => {
        if(err) {
            console.log("Error while fetching activities_materials by id_activity", err);
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

//create new activities_materials
Activities_Material.createNewActivities_Material = (activities_materialsReqData, result) => {
    dbConn.query('INSERT INTO activities_materials SET ? ', activities_materialsReqData, (err, res) => {
        if(err)
        {
            console.log('Error while posting activities_materials data into db.');
            result(null, {status: false, message: err});
        } else {
            console.log("Activities_Material created successfully.");
            result(null, {status: true, message: 'Activities_Material created successfully.'});
        }
    })
}

//update activities_materials
Activities_Material.updateActivities_Material = (id_activity, id_material, activitiesMaterialsData, result) => {
    dbConn.query("UPDATE activities_materials SET id_activity=?, id_material=?, qnt=? WHERE id_activity=? and id_material=?",
    [activitiesMaterialsData.id_activity, activitiesMaterialsData.id_material, activitiesMaterialsData.qnt, id_activity, id_material],
    (err, res) => {
        if(err) {
            console.log('Error while updating Activities_Material data into db.');
            result({status: false, message: err}, null);
        } else {
            console.log("Activities_Material updated successfully.");
            result(null, {status: true, message: 'Activities_Material updated successfully.'});
        }
    })
}

//delete activities_materials
Activities_Material.deleteActivities_Material = (id_activity, id_material, result) => {
    dbConn.query('DELETE FROM activities_materials WHERE id_activity=? AND id_material=?', [id_activity, id_material], (err, res) => {
        if(err) {
            console.log("Error while deleting activities_materials by id", err);
            result(err, null);
        } else {
            result(null, "Deleted activities_materials successfully")
        }
    });
}

module.exports = Activities_Material;