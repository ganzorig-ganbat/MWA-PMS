const express = require('express');
const router = express.Router();

// JWT USING
const config = require('./config');
const jwt = require('jsonwebtoken');

let db = null;
const col = 'user';
// POST AUTH localhost:3000/api/auth/login
router.post('/login', function (req, res) {
    db = req.db;
    const email = req.body.email;
    const password = req.body.password;
    db.collection(col).findOne({ email: email }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.send({ success: false, message: 'Authentication failed. User not found' });
        } else if (user) {
            if (user.pass != password) {
                res.send({ success: false, message: 'Authentication failed. Wrong password' });
            } else {
                const payload = { id: user._id };
                const token = jwt.sign(payload, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.send({
                    success: true,
                    message: 'Now you can use token',
                    token: token
                })
            }
        }
    });
});

// POST USER REGISTER
router.post('/register', function (req, res) {
    db = req.db;
    const postRegisterData = req.body;
    if (!isEmpty(postRegisterData.name) && !isEmpty(postRegisterData.email) && !isEmpty(postRegisterData.password)) {
        if (postRegisterData.password === postRegisterData.repassword) {
            db.collection(col).insert({
                name: postRegisterData.name,
                email: postRegisterData.email,
                pass: postRegisterData.password,
                projects: [],
                img: "https://randomuser.me/api/portraits/men/43.jpg"
            }, function (err, result) {
                if (err) throw err;
                res.send(result);
            });
        } else {
            res.send('Your password does not match');
        }
    } else {
        res.send('Name, Email and Password are required');
    }
});



module.exports = router;