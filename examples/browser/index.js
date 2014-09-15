/*jslint node: true */

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/js/qrcoder.js', express.static(__dirname + '/../../qrcoder.js'));

app.listen(8080);
console.log('listening on port 8080');
