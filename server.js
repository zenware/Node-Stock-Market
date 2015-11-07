var express = require('express'), app = express();
var request = require('bhttp');
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

var knex = require('knex');

var knex = require('knex')({
    client: 'postgresql',
    connection: {
        host: '127.0.0.1',
        user: 'Rex',
        password: '',
        database: 'NSM',
        charset: 'UTF8'
    }
});

var bookshelf = require('bookshelf')(knex);
var pg = require('pg');

var Portfolio = bookshelf.Model.extend({
    tableName: 'stocks',
});

var formatQuery = require('./format-query');
var formatData = require('./format-data');

rl.setPrompt('-> ');
rl.prompt();

rl.on('line', function(line) {
    var query = formatQuery(line);
    request.get(query, {}, function(error, response) {
        if (error) console.log('Exec error: ' + error);
        console.log(response.body.toString() + '\n');
        var data = formatData(response.body.toString());
        console.log(data);
        rl.prompt();
    });
});

var server = app.listen(6446, function () {
    console.log('Server running on port: 6446');
});