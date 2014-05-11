var os = require('os');  
var app = require('express')()
   , server = require('http').createServer(app)
   , io = require('socket.io').listen(server)

var MongoClient = require('mongodb').MongoClient  
    , format = require('util').format;  
   
var express = require('express');

io.set('log level', 1); 
server.listen(8081);

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');

/*
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();
});
*/

app.get('/', function (req, res) {
    res.render('index', {
            title: "EJS example",
            header: "Some users"
          });
});

app.get('/monitor', function (req, res) {
    res.render('monitor', {
         });
});

/*
app.get('/crc', function (req, res) {
    MongoClient.connect('mongodb://127.0.0.1:27017/test2', function(err, db) {
       if(err) throw err;

       var collection = db.collection('CellCrc');
       collection.find().limit(50).toArray(function(err, results) {
           res.render('crc', {
             method: req.query.method,
             res: results
           });
           db.close();
       }); 
    });
});

app.get('/bw', function (req, res) {
    res.render('bw', {
          });
});

app.get('/ue', function (req, res) {
    MongoClient.connect('mongodb://127.0.0.1:27017/test2', function(err, db) {
       if(err) throw err;

       var collection = db.collection('UeBw');
       collection.find().limit(50).toArray(function(err, results) {
           res.render('ue', {
             method: "0",
             res: results
           });
           db.close();
       }); 
    });
});
*/
