const express = require('express');
const router = express.Router();

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
router.get('/:id', function (req, res) {
    db = req.db;
    const id = parseInt(req.params.id);
    db.collection(col).find({ _id: id }).toArray(function (err, docArr) {
        if (err) throw err;
        res.send(docArr);
    });
});

// POST USER LOGIN
router.post('/login', function (req, res) {
    db = req.db;
    const postLoginData = req.body;
    // console.log(postData.email, postData.password);
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
            db.collection(col).find({}).sort({ _id: -1 }).project({ _id: 1 }).limit(1).toArray(function (err, data) {
                const lastID = data[0]._id;
                db.collection(col).insert({
                    _id: lastID + 1,
                    name: postRegisterData.name,
                    email: postRegisterData.email,
                    pass: postRegisterData.password,
                    projects: []
                }, function (err, result) {
                    if (err) throw err;
                    res.send(result);
                });
            });
        } else {
            res.send('Your password does not match');
        }
    } else {
        res.send('Name, Email, Password are required');
    }
});

// PUT USER EDIT PROFILE
router.put('/edit/:id', function (req, res) {
    db = req.db;
    const id = parseInt(req.params.id);
    
});

function isEmpty(str) {
    return (!str || 0 === str.length);
}

module.exports = router;