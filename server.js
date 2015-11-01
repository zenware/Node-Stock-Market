var express = require('express'), app = express();
var request = require('bhttp');
var readline = require('readline');
var secret = require('./secret');
var rl = readline.createInterface(process.stdin, process.stdout);

var knex = require('knex');

var knex = require('knex')({
    client: 'postgresql',
    connection: {
        host: '127.0.0.1',
        user: secretUser,
        password: secretPass,
        database: 'test',
        charset: 'UTF8'
    }
});

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
    tableName: 'stocks',
});

var dataGet = require('./data-get');

rl.setPrompt('-> ');
rl.prompt();

rl.on('line', function(line) {
    var query = dataGet(line);
    request.get(query, {}, function(error, response) {
        if (error) console.log('Exec error: ' + error);
        console.log(response.body.toString());
        rl.prompt();
    });
});

var server = app.listen(6446, function () {
    console.log('Server running on port: 6446');
});