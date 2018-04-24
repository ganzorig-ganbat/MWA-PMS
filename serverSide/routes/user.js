const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

const col = 'user';
let db = null;
// GET ALL TASK LIST
router.get('/', function (req, res) {
    db = req.db;
    db.collection(col).find({}).toArray(function (err, docArr) {
        if (err) throw err;
        res.send(docArr);
    });
});

// GET ALL TASK BY PROJECT
router.get('/profile/:id', function (req, res) {
    db = req.db;
    const id = req.params.id;
    db.collection(col).find({ _id: ObjectID(id) }).toArray(function (err, docArr) {
        if (err) throw err;
        res.send(docArr);
    });
});

// POST USER LOGIN
router.post('/login', function (req, res) {
    db = req.db;
    const postLoginData = req.body;
    db.collection(col).find({ email: postLoginData.email, pass: postLoginData.password }).toArray(function (err, docArr) {
        if (err) throw err;
        res.send(docArr);
    })
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

// PUT USER EDIT PROFILE
router.put('/edit/:id', function (req, res) {
    db = req.db;
    const id = req.params.id;
    const putEditData = req.body;
    db.collection(col).findAndModify({ _id: ObjectID(id) }, {}, {
        $set: {
            name: putEditData.name,
            email: putEditData.email,
            img: putEditData.img
        }
    }, { new: true }, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// DELETE USER 
router.delete('/delete/:id', function (req, res) {
    db = req.db;
    const id = req.params.id;
    db.collection(col).remove({ _id: ObjectID(id) }, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});


function isEmpty(str) {
    return (!str || 0 === str.length);
}

module.exports = router;