const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Model imports
const Users = require('../model/users');
const Topics = require('../model/topics');

/**
 * User APIs
 */
app.get('/user/:userId', (req, res) => {
    var userId = req.params.userId;
    Users.getOneUser(userId, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send();
        } else {
            return res.status(200).json(results);
        }
    });
});

app.put('/editUser/:userId', (req, res) => {
    var userId = req.params.userId;
    var username = req.body.username;
    var email = req.body.email;
    var currentPw = req.body.currentPassword;
    var newPw = req.body.newPassword;
    var confirmPw = req.body.confirmPassword;

    if (newPw === confirmPw) {
        Users.editUserDetails(userId, username, email, currentPw, newPw, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send();
            } else {
                return res.status(200).json(results);
            }
        });
    } else {
        res.status(422).send();
        res.redirect(`/user/${userId}`);
    }
});


/**
 * Topics APIs
 */
app.get('/topics', (req, res) => {
    // const userId = req.params.userId;
    Topics.getAllTopics((err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send();
        } else {
            return res.status(200).json(results);
        }
    });
});

module.exports = app;