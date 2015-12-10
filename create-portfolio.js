var express = require('express');
var app = express();
var readline = require('readline');
var pg = require('pg');
var rl = readline.createInterface(process.stdin, process.stdout);
var config = require('./config.json');
var knex = require('knex')(config.knex);

function buildPortfolioTable(table) {
    return knex.schema.hasTable(table).then(function(exists) {
        if (!exists) {
            return knex.schema.createTable(table, function(t) {
                t.integer('id')
                    .index();
                t.integer('user_id')
                    index('user.id');
            })
        }
    })
}

rl.on('line', function(line) {
    var caps = line.toUpperCase();
});