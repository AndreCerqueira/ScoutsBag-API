var dbConn = require('../../config/db.config');

var Material = function(material){
    this.id_material = material.id_material;
    this.name_material = material.name_material;
    this.qnt_stock = material.qnt_stock;
    this.image_url = material.image_url;
    this.material_type = material.material_type;
}

// get all materials
Material.getAllMaterials = (result) => {
    dbConn.query('SELECT * FROM materials', (err, res) => {
        if(err){
            console.log("Error while fetching materials.", err);
            result(err, null);
        }
        else{
            console.log('Materials fetched successfully.');
            result(null, res);
        }
    })
}

//get material by ID from DB
Material.getMaterialByID = (id, result) => {
    dbConn.query('SELECT * FROM materials WHERE id_material=?', id, (err, res) => {
        if(err) {
            console.log("Error while fetching material by id", err);
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

//create new material
Material.createNewMaterial = (materialReqData, result) => {
    dbConn.query('INSERT INTO materials SET ? ', materialReqData, (err, res) => {
        if(err)
        {
            console.log('Error while posting material data into db.');
            result(null, {status: false, message: err});
        } else {
            console.log("Material created successfully.");
            result(null, {status: true, message: 'Material created successfully.'});
        }
    })
}

//update material
Material.updateMaterial = (id, materialReqData, result) => {
    dbConn.query("UPDATE materials SET name_material=?, qnt_stock=?, image_url=?, material_type=? WHERE id_material=?",
    [materialReqData.name_material, materialReqData.qnt_stock, materialReqData.image_url, materialReqData.material_type, id],
    (err, res) => {
        if(err) {
            console.log('Error while updating material data into db.');
            result(null, {status: false, message: err});
        } else {
            console.log("Material updated successfully.");
            result(null, {status: true, message: 'Material updated successfully.', insertID: res.id_material});
        }
    })
}

//delete material
Material.deleteMaterial = (id, result) => {
    dbConn.query('DELETE FROM materials WHERE id_material=?', id, (err, res) => {
        if(err) {
            console.log("Error while deleting material by id", err);
            result(null, err);
        } else {
            result(null, res)
        }
    })
}

module.exports = Material;