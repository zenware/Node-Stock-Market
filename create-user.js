var express = require('express');
var app = express();
var readline = require('readline');
var pg = require('pg');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var rl = readline.createInterface(process.stdin, process.stdout);
var config = require('./config.json');
var knex = require('knex')(config.knex);

function buildUserTable(table) {
    return knex.schema.hasTable(table).then(function(exists) {
        if (!exists) {
            return knex.schema.createTable(table, function(t) {
                t.increments('id')
                    .notNullable()
                    .primary()
                    .unique();
                t.string('username')
                    .unique();
                t.string('password')
                    .notNullable();
            });
        }
    });
}

// buildUserTable('test_user');
rl.setPrompt('›› ');

function newUser() {
    rl.question('Username ›› ', function(username) {
        rl.prompt();
    });
    rl.question('Password ›› ', function(password) {
        rl.prompt();
    });
}

function testNewUser() {
    rl.question('Username ›› ', function(username) {
        rl.question('Password ›› ', function(password) {
            console.log(username);
            console.log(password);
            rl.prompt();
        });
    });
}

rl.question('Are you a new user? ', function(answer) {
    if (answer.match(/^y(es)?$/i)) {
        testNewUser();
    } else {
        rl.prompt();
    }
});

rl.on('line', function(line) {
    console.log(line);
    rl.prompt();
});

app.listen(6446);