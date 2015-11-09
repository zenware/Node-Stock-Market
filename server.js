var express = require('express'), app = express();
var request = require('bhttp');
var readline = require('readline');
var pg = require('pg');
var rl = readline.createInterface(process.stdin, process.stdout);

var knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'test',
        password: '',
        database: 'NSM',
        charset: 'UTF8'
    }
});

// Formats the query and data retrieved
var formatQuery = require('./format-query');
var formatData = require('./format-data');

var dbSchema = require('./db-schema');
var buildSchema = require('./build-schema');

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
    console.log('\nServer running on port: 6446');
});