var config = require('./config.json');
var knex = require('knex')(config.knex);
var pg = require('pg');

var schema = {
    user: function() {
        return knex.schema.hasTable('user').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('user', function(t) {
                    t.increments('id')
                        .notNullable()
                        .primary();
                    t.string('username')
                        .unique();
                    t.string('password')
                        .notNullable();
                });
            }
        });
    },
    stock: function() {
        return knex.schema.hasTable('stock').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('stock', function(t) {
                    t.increments('id')
                        .primary();
                    t.string('symbol')
                        .unique();
                    t.string('exchange');
                });
            }
        });
    },
    stock_data: function() {
        return knex.schema.hasTable('stock_data').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('stock_data', function(t) {
                    t.integer('stock_id')
                        .index()
                        .references('stock.id');
                    t.double('price')
                        .notNullable();
                    t.double('change');
                    t.string('last_update');
                });
            }
        });
    },
    portfolio: function() {
        return knex.schema.hasTable('portfolio').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('portfolio', function(t) {
                    t.integer('id')
                        .index();
                    t.integer('user_id')
                        .index('user.id');
                    t.integer('stock_id')
                        .index('stock.id');
                    t.integer('buy_price')
                        .notNullable();
                    t.integer('sell_price')
                        .notNullable();
                });
            }
        });
    },
    user_capital: function() {
        return knex.schema.hasTable('user_capital').then(function(exists) {
            if (!exists) {
                return knex.schema.createTable('user_capital', function(t) {
                    t.integer('user_id')
                        .index('user.id');
                    t.double('capital');
                });
            }
        });
    }
}