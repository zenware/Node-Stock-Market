module.exports = function(dbSchema) {
    return Object.keys(dbSchema).forEach(function(tableName) {
        knex.schema.hasTable(tableName).then(function(tableExists) {
            if (!tableExists) {
                return knex.schema.createTable(tableName, function(t) {
                    Object.keys(dbSchema[tableName]).forEach(function(tableCol) {
                        switch (dbSchema[tableName][tableCol]['type']) {
                            default:
                                knexTable[ dbSchema[tableName][tableCol]['type'] ](tableCol, dbSchema[tableName][tableCol]);
                            break;
                        }
                        if ('primary' in dbSchema[tableName][tableCol]) {
                            knexTable.primary();
                        }
                    });
                });
            }
        });
    });
}