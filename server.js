var express = require('express'), app = express();
var request = require('bhttp');

var knex = require('knex');
var bookshelf = require('bookshelf');

var dataGet = require('./dataGet');

request.get(dataGet('GOOG'), {}, function(error, response) {
    console.log(response.body.toString());
});

var server = app.listen(6446, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});