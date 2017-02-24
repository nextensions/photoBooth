var express = require('express');    //Express Web Server
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');
var cors = require('cors');       //File System - for file manipulation

var app = express();
app.use(busboy());
app.use(cors());
app.use(express.static(path.join(__dirname, 'uploads')));

/* ==========================================================
Create a Route (/upload) to handle the Form submission
(handle POST requests to /upload)
Express v4  Route definition
============================================================ */
app.route('/upload')
    .post(function (req, res, next) {
        var fstream;
        var params = {};
        req.pipe(req.busboy);
        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
            // console.log("Uploading: " + filename);
            //Path where image will be uploaded
            var id = new Date().getTime() + Math.random();
            console.log(params)
            fstream = fs.createWriteStream(__dirname + '/uploads/cards/' + id + "." + params.name + ".jpg");
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log("Upload Finished of " + filename);
                res.redirect('back');           //where to go next
            });
        });
        req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
          console.log('Field [' + fieldname + ']: value: ' + (val));
          params[fieldname] = val;
        });
        req.busboy.on('finish', function() {
          console.log('Done parsing form!');
        });
    });

var server = app.listen(3030, function() {
    console.log('Listening on port %d', server.address().port);
});