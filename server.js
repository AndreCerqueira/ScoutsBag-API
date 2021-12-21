require('dotenv/config')
const UserModel = require('./src/models/user.model');

const express = require("express");
const multer = require('multer')
const bodyParser = require('body-parser');
const AWS = require('aws-sdk')
var crypto = require('crypto');

//create express app
const app = express();

//server port
const port = process.env.port || 60000;

app.use(express.json());

//import activities routes
const activitiesRoute = require('./src/routes/activities.route');
//import users routes
const usersRoute = require('./src/routes/users.route');
//import catalogs routes
const catalogsRoute = require('./src/routes/catalogs.route');
//import activityTypes routes
const activityTypesRoute = require('./src/routes/activityTypes.route');
//import teams routes
const teamsRoute = require('./src/routes/teams.route');
//import materials routes
const materialsRoute = require('./src/routes/materials.route');
//import instructions routes
const instructionsRoute = require('./src/routes/instructions.route');
//import statistics routes
const statisticsRoute = require('./src/routes/statistics.route');
//import activitiesCatalogs routes
const activitiesCatalogsRoute = require('./src/routes/activitiesCatalogs.route');
//import activitiesMaterials routes
const activitiesMaterialsRoute = require('./src/routes/activitiesMaterials.route');
//import activitiesInvites routes
const activitiesInvitesRoute = require('./src/routes/activitiesInvites.route');
//import participation routes
const participationRoute = require('./src/routes/participation.route');
//import activitiesTeams routes
const activitiesTeamsRoute = require('./src/routes/activitiesTeams.route');

const User = require('./src/models/user.model');
const { userForgotPass } = require('./src/models/user.model');

// create activities routes
app.use('/api/v1/activities', activitiesRoute);
//create users route
app.use('/api/v1/users', usersRoute);
//create users route
app.use('/api/v1/catalogs', catalogsRoute);
//create activityTypes route
app.use('/api/v1/activityTypes', activityTypesRoute);
//create teams route
app.use('/api/v1/teams', teamsRoute);
//create materials route
app.use('/api/v1/materials', materialsRoute);
//create instructions route
app.use('/api/v1/instructions', instructionsRoute);
//create statistics route
app.use('/api/v1/statistics', statisticsRoute);
//create activitiesCatalogs route
app.use('/api/v1/activitiesCatalogs', activitiesCatalogsRoute);
//create activitiesMaterials route
app.use('/api/v1/activitiesMaterials', activitiesMaterialsRoute);
//create activitiesInvites route
app.use('/api/v1/activitiesInvites', activitiesInvitesRoute);
//create participations route
app.use('/api/v1/participations', participationRoute);
//create activitiesTeams route
app.use('/api/v1/activitiesTeams', activitiesTeamsRoute);


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

//create new s3 storage instance
const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({storage}).single('image')
//post image to s3 server
app.post("/upload", upload, (req, res) => {

    console.log("IN")

    let myImage = req.file.originalname.split(".")
    const fileType = myImage[myImage.length - 1]

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ACL: "public-read"
    }

    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error)
        }

        res.status(200).send(data)
    })
})


app.post("/forgot", (req, res) => {
    UserModel.findOne(req.body.email, (err, result) => {
        if(result[0].cnt == 0) {
            res.status(409).json({
                message: "Email does not exist!"
            });
        } else {
            crypto.randomBytes(2, function(err, buf) {
                var genToken = buf.toString("hex")
                User.userForgotPass(req.body.email, genToken, (err, result) => {
                    if(err) {
                        res.status(409).send(err)
                    } else {
                        User.saveToken(req.body.email, genToken, (err, response) => {
                            if(err) {
                                res.send("Error saving token: " + err)
                            } else {
                                res.json({message: "Token saved successfully", email: req.body.email})
                            }
                        })
                    }
                });
            });
        }
    })
})

app.post("/recoverPass", (req, res) => {
    UserModel.findEmailToken(req.body.email, req.body.token, (err, result) => {
        if(result[0].cnt == 0) {
            res.status(409).json({
                message: "Invalid token"
            });
        } else {
            UserModel.updateuserPassword(req.body.email, req.body.password, (err, result) => {
                if(err) {
                    res.status(409).json({
                        message: "Error updating password",
                        error: err
                    });
                } else {
                    res.status(200).json({
                        message: "Password updated successfully"
                    });
                }
            });
        }
    });
})


var dbConn = require('./config/db.config');

setInterval(function(){
    dbConn.query('SELECT * FROM activities_types', (err, res) => {
        if(err){
            console.log("Error while fetching activityTypes.", err);
        }
        else{
            console.log('ActivityTypes fetched successfully.');
        }
    })
}, 14400000)

//listen to the port
app.listen(port, ()=> {
    console.log("Server is running at port: " + port);
});