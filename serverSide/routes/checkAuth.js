const express = require('express');

// JWT USING
const config = require('./config');
const jwt = require('jsonwebtoken');

// route middleware to verify a token
const ret = function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, function (err, decode) {
            if (err) {
                res.send({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decode;
                next();
            }
        })
    } else {
        res.send({ success: false, message: 'No provide token' });
    }
};

module.exports = ret;