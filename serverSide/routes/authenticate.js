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
                const payload = { id: user._id, name: user.name, email: user.email, profile: user.img };
                const token = jwt.sign(payload, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.send({
                    'data': {
                        success: true,
                        message: 'Now you can use token',
                        token: token
                    }
                })
            }
        }
    });
});

router.delete('/logout', function (req, res) {
    db = req.db;
    const email = req.body.email;
    db.collection(col).findOne({ email: email }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.send({ success: false, message: 'Authentication failed. User not found' });
        } else if (user) {
            res.send({
                'data': {
                    success: true,
                    message: 'Logged out'
                }
            })
        }
    });
});

// POST USER REGISTER
router.post('/register', function (req, res) {
    db = req.db;
    const postRegisterData = req.body;
    if (!isEmpty(postRegisterData.fullName) && !isEmpty(postRegisterData.email) && !isEmpty(postRegisterData.password) && !isEmpty(postRegisterData.confirmPassword)) {

        if (postRegisterData.password === postRegisterData.confirmPassword) {
            db.collection(col).insertOne({
                name: postRegisterData.fullName,
                email: postRegisterData.email,
                pass: postRegisterData.password,
                projects: [],
                img: "https://randomuser.me/api/portraits/men/43.jpg"
            }, function (err, result) {
                if (err) throw err;
                const payload = { id: result.ops[0]._id, name: result.ops[0].name, email: result.ops[0].email };
                const token = jwt.sign(payload, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.send({
                    'data': {
                        success: true,
                        messages: 'Now you can use token',
                        token: token
                    }
                })
            });
        } else {
            res.send(JSON.stringify({
                data: {
                    errors: 'Your password does not match'
                }
            }));
        }
    } else {
        res.send(JSON.stringify({
            data: {
                errors: 'Name, Email and Password are required'
            }
        }));
    }
});

function isEmpty(str) {
    return (!str || 0 === str.length);
}

module.exports = router;