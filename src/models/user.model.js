var dbConn = require('../../config/db.config');
var nodemailer = require('nodemailer');

var User = function(user){
    this.id_user = user.id_user;
    this.user_name = user.user_name;
    this.birth_date = user.birth_date;
    this.pass = user.pass;
    this.cod_type = user.cod_type;
    this.email = user.email;
    this.contact = user.contact;
    this.gender = user.gender;
    this.address = user.address;
    this.nin = user.nin;
    this.postal_code = user.postal_code;
    this.user_active = user.user_active;
    this.accepted = user.accepted;
    this.id_team = user.id_team;
    this.image_url = user.image_url;
}

// get all users
User.getAllUsers = (result) => {
    dbConn.query('SELECT * FROM users', (err, res) => {
        if(err){
            console.log("Error while fetching users.", err);
            result(err, null);
        }
        else{
            console.log('Users fetched successfully.');
            result(null, res);
        }
    })
}

//get user by ID from DB
User.getUserByID = (id, result) => {
    dbConn.query('SELECT * FROM users WHERE id_user=?', id, (err, res) => {
        if(err) {
            console.log("Error while fetching user by id", err);
            result(err, null);
        } else {
            result(null, res)
        }
    })
}

//create new user
User.createNewUser = (userReqData, result) => {
    dbConn.query('INSERT INTO users SET ? ', userReqData, (err, res) => {
        if(err)
        {
            console.log('Error while posting user data into db. Erro: ' + err);
            result(null, {status: false, message: err});
        } else {
            console.log("User created successfully.");
            result(null, res);
        }
    })
}

//update user
User.updateUser = (id, userReqData, result) => {
    dbConn.query("UPDATE users SET user_name=?, birth_date=?, gender=?, pass=?, cod_type=?, email=?, contact=?, address=?, nin=?, postal_code=?, image_url=?, user_active=?, accepted=?, id_team=? WHERE id_user=?",
    [userReqData.user_name, userReqData.birth_date, userReqData.gender, userReqData.pass, userReqData.cod_type, userReqData.email,
    userReqData.contact, userReqData.address, userReqData.nin, userReqData.postal_code, userReqData.image_url, userReqData.user_active,
    userReqData.accepted, userReqData.id_team, id],
    (err, res) => {
        if(err) {
            console.log('Error while updating user data into database. Error: ' + err);
            result(null, {status: false, message: err});
        } else {
            console.log("User updated successfully.");
            result(null, {status: true, message: 'User updated successfully.', insertID: res.id_user});
        }
    })
}

//delete user
User.deleteUser = (id, result) => {
    dbConn.query('DELETE FROM users WHERE id_user=?', id, (err, res) => {
        if(err) {
            console.log("Error while deleting user by id", err);
            result(null, err);
        } else {
            result(null, res)
        }
    })
}

//returns the count of emails found
User.findOne = (email, result) => {
    dbConn.query('SELECT COUNT(*) as cnt FROM users where email=? ', email, (err, res) => {
        if(err) {
            console.log('Error while finding emails from db.');
            result({status: false, message: err}, null);
        } else {
            console.log("Search for emails made successfully!");
            result(null, res);
        }
    })
}

//returns the count of email/token pair founds
User.findEmailToken = (email, token, result) => {
    dbConn.query('SELECT COUNT(*) as cnt FROM users_forgot_pass where email=? and token=?', [email, token], (err, res) => {
        if(err) {
            console.log('Error while finding email/token pairs from db.');
            result({status: false, message: err}, null);
        } else {
            console.log("Search for email/token pairs made successfully!");
            result(null, res);
        }
    })
}

//update user password
User.updateuserPassword = (email, password, result) => {
    dbConn.query('UPDATE users set pass=? where email=?', [password, email], (err, res) => {
        if(err) {
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//returns the user account as an object
User.findUserAccount = (emailUser, result) => {
    dbConn.query('SELECT * FROM users where email=? limit 1', emailUser, (err, res) => {
        if(err) {
            console.log('Error while finding emails from db.');
            result({status: false, message: err}, null);
        } else {
            console.log("Search for emails made successfully!");
            result(null, res);
        }
    })
}

//user forgot
User.userForgotPass = (emailUser, token, result) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'scoutsbag@gmail.com',
          pass: 'scoutsbag123'
        }
    });

    const mailOptions = {
        from: 'scoutsbag@gmail.com',
        to: emailUser,
        subject: 'Recuperação palavra-passe ScoutsBag',
        text: 'Código de recuperação: ' + token
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            result(error, null)
        } else {
            result(null, info)
        }
    }
      
      );
}

//save forgot password token in database
User.saveToken = (email, token, result) => {
    var userForgotPass = {email: email, token: token}
    dbConn.query('INSERT INTO users_forgot_pass SET ? ', userForgotPass, (err, res) => {
        if(err) {
            console.log('Error while posting user password token into db.');
            result(err, null);
        } else {
            console.log("Posted user password token into db.");
            result(null, "Token saved successfully");
        }
    })
}

module.exports = User;