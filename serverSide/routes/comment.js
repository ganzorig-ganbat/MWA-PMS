const express = require('express');
// const router = express.Router();
const router = express.Router();
const auth = require('./checkAuth');
const ObjectID = require('mongodb').ObjectID;

const task = 'task';
let db = null;

// GET COMMENT LIST BY TASK
router.get('/:task_id', auth, function (req, res) {
    db = req.db;
    const id = req.params.task_id;

    db.collection(task).aggregate(
        [{ $match: { _id: ObjectID(id) } },
        {
            $lookup:
                { from: "user", localField: "comments.user_id", foreignField: "_id", as: "user_docs" }
        }]).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
        })
});

// PUT CREATE COMMENT
router.put('/create', auth,  function (req, res) {
    db = req.db;
    const putCreateComment = req.body;
    const task_id = putCreateComment.task_id;
    const user_id = putCreateComment.user_id;
    const comment = putCreateComment.comment;
    if (!isEmpty(comment)) {
        db.collection(task).update({ _id: ObjectID(task_id) }, {
            $push: {
                comments: {
                    id: new ObjectID(),
                    user_id: ObjectID(user_id),
                    comment: comment,
                    commentDate: new Date()
                }
            }
        }, function (err, result) {
            if (err) throw err;
            res.send(result);
        })
    } else {
        res.send('Comment is required');
    }
});

// PUT DELETE COMMENT
router.put('/delete/:task_id/:comment_id', auth,  function (req, res) {
    db = req.db;
    const task_id = req.params.task_id;
    const comment_id = req.params.comment_id;
    db.collection(task).update({ _id: ObjectID(task_id) }, {
        $pull: {
            comments: {
                id: ObjectID(comment_id)
            }
        }
    }, function (err, result) {
        if (err) throw err;
        res.send(result);
    })
});

function isEmpty(str) {
    return (!str || 0 === str.length);
}

module.exports = router;