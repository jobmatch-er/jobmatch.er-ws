var express = require('express');
var router = express.Router();
var fetcher = require('../fetcher.js')

router.post('/', function(req, res, next) {
    if (req.user && req.user.data.employerdata > 0) {
        console.log(JSON.stringify(req.user.data.employer[0].jobinfo))
        let jsonn = JSON.parse(req.user.data.employer[0].jobinfo)
        jsonn.chips   = req.body.chips;
        let command = "UPDATE employer_data SET jobinfo = '" + JSON.stringify(jsonn) + "' WHERE id = " + req.user.data.employerdata
        fetcher.sendCommand(command, function (err, data) {
            console.log(data)
            res.sendStatus(300);
        })
    } else if(req.user && req.user.data.employerdata === 0){
        let jsonn = JSON.parse(req.user.data.chips)
        jsonn = req.body.chips;
        let command = "UPDATE user SET chips = '" + JSON.stringify(json) + "' WHERE email = " + req.user.data.email
        fetcher.sendCommand(command, function (err, data) {
            console.log(data)
            res.sendStatus(300);
        })
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
