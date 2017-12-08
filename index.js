/*var express = require ('express');
var app = express();
var bodyParser = require('body-parser');

app.set('num', 1);
var num = app.get('num');
console.log(num); //1 //set and get value.

app.use(function (req, res, next) { // .user ถูกทำทุกครั้งเมื่อมีการrequest
    console.log('Record timestamp');
    next(); //ทำfunction ถัดไป middle ware
});

app.use(bodyParser.json()); //ทุกครั้งที่มีการส่งrequesrt ที่ใช้.json อ่านbody ประเภท json

app.post('/calculator/rest/plus', function (req, res, next) { 
    var body = req.body; //creat var body  
    var x = body.x;
    var y = body.y;
    var result = 0;
    var objecy = {
        "x": x,
        "y": y,
        "result" :x+y
    }
    res.json(objecy); //if เอา .a ออก จะshow body เป็น obj นึง
});

app.get ('/help',function (req, res, next) {
    res.send('Help me'); 
}); // get 2 อันบน เป็นการทำrouting

app.listen(3000, function(){
    console.log('Starting node on port 3000') //ให้ express start อยู่ที่port 3000
});*/


// add to file ./index.js

import mongoose from './config/mongoose';
import express from './config/express';
import passport from './config/passport';


process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3000;

var db = mongoose();
var app = express();
var psp = passport();

app.listen(process.env.PORT, () => {
    console.log('Starting node.js on port ' + process.env.PORT);
});

module.exports = app;