var express = require('express');
var app = express();
var request = require('bhttp');
var readline = require('readline');
var pg = require('pg');
var rl = readline.createInterface(process.stdin, process.stdout);
var config = require('./config.json');

var knex = require('knex')(config.knex);

var formatQuery = require('./format-query');
var formatData = require('./format-data');

var dbSchema = require('./db-schema-test');


rl.setPrompt('›› ');
rl.prompt(); 

rl.on('line', function(line) {
    var query = formatQuery(line);
    request.get(query, {}, function(error, response) {
        if (error) console.log('Exec error: ' + error);
        var data = formatData(response.body.toString());
        console.log(data);
        rl.prompt();
    });
});

app.listen(6446, function () {
    console.log('Server running on port: 6446');
});