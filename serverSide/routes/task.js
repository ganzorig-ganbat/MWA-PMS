const express = require('express');
const router = express.Router();

const col = 'task';
// GET ALL TASK LIST
router.get('/', function (req, res) {
    const db = req.db;
    db.collection(col).find({}).toArray(function (err, docArr) {
        if (err) throw err;
        res.send(docArr);
    });
});

// GET ALL TASK BY PROJECT
router.get('/project/:id', function (req, res) {
    const db = req.db;
    const id = parseInt(req.params.id);
    db.collection(col).find({ project_id: id }).toArray(function (err, docArr) {
        if (err) throw err;
        console.log(docArr);
        res.send(docArr);
    });
});

module.exports = router;