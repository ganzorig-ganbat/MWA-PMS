const express = require('express');
// const router = express.Router();
const router = express.Router();
const auth = require('./checkAuth');
const ObjectID = require('mongodb').ObjectID;

const col = 'user';
let db = null;
// GET ALL TASK LIST
router.get('/', auth, function (req, res) {
    db = req.db;
    db.collection(col).find({}).toArray(function (err, docArr) {
        if (err) throw err;
        res.send(docArr);
    });
});

// GET ALL TASK BY PROJECT
router.get('/profile/:id', auth, function (req, res) {
    db = req.db;
    const id = req.params.id;
    db.collection(col).find({ _id: ObjectID(id) }).toArray(function (err, docArr) {
        if (err) throw err;
        res.send(docArr);
    });
});

// PUT USER EDIT PROFILE
router.put('/edit/:id', auth, function (req, res) {
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
router.delete('/delete/:id', auth, function (req, res) {
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