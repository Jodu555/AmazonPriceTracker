const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();

function createTables() {

    database.createTable('product', {
        options: {
            PK: 'UUID',
        },
        UUID: 'varchar(64)',
        amazon_link: 'varchar(64)',
        product_data_UUID: 'varchar(64)',
    });

    database.createTable('product_data', {
        options: {
            PK: 'UUID',
            FK: {
                'UUID': 'product/UUID',
            },
        },
        UUID: 'varchar(64)',
        time: 'varchar(64)',
        title: 'varchar(64)',
        price: 'varchar(64)',
        rating: 'TEXT',
        descriptions: 'TEXT',
        specifications: 'TEXT',
        availability: 'TEXT',
        delivery: 'TEXT',
    });


}

module.exports = { createTables };