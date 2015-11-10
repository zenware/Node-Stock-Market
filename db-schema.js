const drop = (knex, tbl) => knex.schema.dropTableIfExists(tbl);

const schemas = {
    users : function(knex){
        const create = table => {
            table
            .increments('id')
            .primary();
            
            table
            .string('email')
            .unique()
            .notNullable();
            
            table
            .string('password', 53)
            .notNullable();
        }
        return drop(knex, 'users')
        .then(() => knex.schema.createTable('users', create));
    },
    portfolio : function(knex){
        const create = table => {
            table
            .increments('id')
            .primary();
            
            table
            .string('name', 50)
            .unique()
            .notNullable();
        }
        return drop(knex, 'portfolio')
        .then(() => knex.schema.createTable('portfolio', create));
        
    },
    stocks : function(knex){
        const create = table => {
             table
            .increments('id')
            .primary()
            .notNullable();
            
            table
            .string('company', 30)
            .index()
            .notNullable();
            
            
            table
            .string('exchange', 30)
            .notNullable();
            
            table
            .string('symbol', 10)
            .index()
            .notNullable();
            
            table
            .unique(['exchange', 'symbol']);
        }
        return drop(knex, 'stocks')
        .then(() => knex.schema.createTable('stocks', create));
    },
    stock_history : function(knex){
        const create = table => {
            table
            .decimal('price')
            .notNullable()
            .index();
            
            table
            .integer('id')
            .index()
            .references('id')
            .inTable('stocks');
        }
        
        return drop(knex, 'stock_history')
        .then(() => knex.schema.createTable('stock_history', create));
        
    }
}

module.exports = schemas;

if(require.main === module){
    console.log('Creating tables');
    const config = require('./config.json');
    const knex = require('knex')(config.knex);
    Object.keys(schemas).map(k => schemas[k](knex));
}