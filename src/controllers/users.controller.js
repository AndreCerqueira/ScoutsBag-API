const UserModel = require('../models/user.model');

const bscryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// get all users list
exports.getAllUsers = (req, res) => {
    UserModel.getAllUsers((err, users) => {
        if(err){
            res.send(err);
        } else {
            res.send(users);
        }
    })
}


//get user from id
exports.getUserByID = (req, res) => {
    UserModel.getUserByID(req.params.id, (err, user) => {
        if(err){
            res.send(err);
        } else {
            res.send(user);
        }
    })
}

//create new user
exports.createNewUser = (req, res) => {
    const userData = new UserModel(req.body);
    UserModel.findOne(userData.email, (err, result) => {
        if(result[0].cnt > 0) {
            res.status(409).json({
                message: "Email already exists!"
            });
        } else {
            bscryptjs.genSalt(10, function(err, salt){
                bscryptjs.hash(req.body.pass, salt, function(err, hashPassword){
                    //userData.pass = hashPassword;
                    UserModel.createNewUser(userData, (err, user) => {
                        if(err) {
                            res.send(err);
                        } else {
                            res.json({status: true, message: "User Created Successfully", data: user});
                        }
                    });
                });
            });
        }
    });
}

//user login
exports.userLogin = (req, res) => {
    UserModel.findUserAccount(req.body.email, (err, result) => {
        if(result.length <= 0) {
            res.status(409).json({
                message: "No email found!"
            });
        } else {
            if(result[0].accepted == 1 && result[0].user_active == 1) {
                if(req.body.pass === result[0].pass) {
                    const token = jwt.sign({
                        email: req.body.email,
                        userId: result.id_user
                    }, 'secret', function(err, token){
                        res.status(200).json({
                            message: "Authentication successfull",
                            token: token,
                            userInfo: result
                        });
                    });
                } else {
                    res.status(409).json({
                        message: "Password is not valid!"
                    });
                }  
            } else {
                res.status(409).json({
                    message: "Account not active"
                });
            }
        }
    });
}

//update a user
exports.updateUser = (req, res) => {
    const userData = new UserModel(req.body);
    UserModel.updateUser(req.params.id, userData, (err, activity) => {
        if(err) {
            res.send(err);
        } else {
            res.json({status: true, message: "User Updated Successfully"});
        }
    })
}

//delete a user
exports.deleteUser = (req, res) => {
    UserModel.deleteUser(req.params.id, (err, user) => {
        if(err){
            res.send(err);
        } else {
            res.send(user);
        }
    })
}