const express = require('express');
// const router = express.Router();
const router = require('./checkAuth');
const ObjectID = require('mongodb').ObjectID;

const col = 'task';
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
router.get('/project/:id', function (req, res) {
    db = req.db;
    const id = req.params.id;
    db.collection(col).find({ project_id: ObjectID(id) }).toArray(function (err, docArr) {
        if (err) throw err;
        res.send(docArr);
    });
});

// GET TASK BY ID
router.get('/detail/:id', function (req, res) {
    db = req.db;
    const id = req.params.id;
    db.collection(col).find({ _id: ObjectID(id) }).toArray(function (err, docArr) {
        if (err) throw err;
        res.send(docArr);
    });
})

// POST CREATE TASK
router.post('/create', function (req, res) {
    db = req.db;
    const postCreateData = req.body;
    const taskDueDate = isEmpty(postCreateData.dueDate) ? new Date() : new Date(postCreateData.dueDate);
    const userId = isEmpty(postCreateData.user_id) ? null : ObjectID(postCreateData.user_id);
    if (!isEmpty(postCreateData.name) && !isEmpty(postCreateData.project_id)) {
        db.collection(col).insert({
            name: postCreateData.name,
            description: postCreateData.description,
            dueDate: taskDueDate,
            comments: [],
            project_id: ObjectID(postCreateData.project_id),
            user_id: userId,
            status: 'pending'
        }, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    } else {
        res.send('Task name and project_id are required');
    }
});

// DELETE TASK
router.delete('/delete/:task_id', function (req, res) {
    db = req.db;
    const id = req.params.task_id;
    db.collection(col).remove({ _id: ObjectID(id) }, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

// GET COMPLETE TASK
router.put('/complete/:task_id', function (req, res) {
    db = req.db;
    const id = req.params.task_id;
    db.collection(col).update({ _id: ObjectID(id) }, { $set: { status: "completed" } }, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});


function isEmpty(str) {
    return (!str || 0 === str.length);
}

module.exports = router;