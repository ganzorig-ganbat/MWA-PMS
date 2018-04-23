const express = require('express');
const router = express.Router();

// GET INDEX WELCOME PAGE
router.get('/', function (req, res) {
    res.render('index', { title: 'KENZO & SD PROJECT - PMS' });
});

module.exports = router;