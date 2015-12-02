var express = require('express');
var app = express();
var request = require('bhttp');
var readline = require('readline');
var pg = require('pg');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var rl = readline.createInterface(process.stdin, process.stdout);
var config = require('./config.json');
var fromScratch = false;

var knex = require('knex')(config.knex);

var formatQuery = require('./format-query');
var formatData = require('./format-data');
var inputValidation = require('./input-validation');

// var dbSchema = require('./db-schema-test');
// if (fromScratch) buildTable('stock');

rl.setPrompt('›› ');

/* Test functions */
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

function buildStockTable(table) {
    return knex.schema.hasTable(table).then(function(exists) {
        if (!exists) {
            return knex.schema.createTable(table, function(t) {
                t.string('symbol', 10)
                    .notNullable()
                    .primary();
                t.decimal('price')
                    .notNullable();
                t.string('date', 20)
                    .notNullable();
            });
        }
        console.log('Table Exists');
    });
}

function buildPortfolioTable(table) {
    return knex.schema.hasTable(table).then(function(exists) {
        if (!exists) {
            return knex.schema.createTable(table, function(t) {
                t.integer('id')
                    .index();
                t.integer('user_id')
                    .index('user.id');
                t.integer('stock_id')
                    .index('stock.id');
            });
        }
    })
}

// Insert stock symbol & price into table
function insertSymbol(symbol, price, date) {
    return knex('TestOne').insert({
        symbol: symbol,
        price: price,
        date: date
    }).then(function() {
        knex('TestOne').count('symbol').then(function(data) {
            console.log(data);
        });
    });
}

// Insert username & password into 'user'
function insertUser(user, pass) {
    return knex('user').insert({
        username: user,
        password: pass
    }).then(function() { 
        rl.prompt();
    });
}

function createNewUser() {
    rl.question('Username ›› ', function(username) {
        rl.question('Password ›› ', function(password) {
            insertUser(username, password);
            rl.prompt();
        });
    });
}

// Create new user
rl.question('Are you a new user? ', function(answer) {
    if (answer.match(/^y(es)?$/i)) {
        createNewUser();
    } else {
        rl.prompt();
    }
});

// Input stock symbols & get back data
rl.on('line', function(line) {
    var validatedInput = inputValidation(line);
    validatedInput.forEach(function(x) {
        var query = formatQuery(x);
        request.get(query, {}, function(error, response) {
            if (error) console.log('Exec error: ' + error);
            var data = formatData(response.body.toString());

            /* Stock Data */
            var stockData = {
                symbol: data.t,
                exchange: data.e,
                price: Number(data.l),
                priceChange: data.c,
                percentChange: Number(data.cp_fix),
                lastOpen: data.lt,
                lastDateStamp: data.lt_dts
            };

            console.log(stockData);
            rl.prompt();
            /* Insert symbol values into table */
            /* insertSymbol( 
                dataObject.symbol,
                dataObject.price,
                dataObject.date 
            ); */
        });
    });
});

app.listen(6446);