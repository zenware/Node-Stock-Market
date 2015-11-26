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
                    .unique()
                    .notNullable();
                t.string('password')
                    .notNullable();
            });
        }
    });
}

/* passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ 
            username: username 
        }, function(error, user) {
            if (error) { return done(error); }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username or password'
                });
            }
            if (!user.validPassword(password) {
                return done(null, false, {
                    message: 'Incorrect username or password'
                });
            });
            return done(null, user);
        });
    }
)); */

buildUserTable('test_user');
rl.setPrompt('›› ');

function insertUser(user, pass) {
    return knex('test_user').insert({
        username: user,
        password: pass
    }).then(function(data) { 
        console.log(data);
        rl.prompt();
    });
}

function createNewUser() {
    rl.question('Username ›› ', function(username) {
        rl.question('Password ›› ', function(password) {
            console.log(username, password);
            insertUser(username, password);
            rl.prompt();
        });
    });
}

rl.question('Are you a new user? ', function(answer) {
    if (answer.match(/^y(es)?$/i)) {
        createNewUser();
    } else {
        rl.prompt();
    }
});

rl.on('line', function(line) {
    console.log(line);
    rl.prompt();
});

app.listen(6446);