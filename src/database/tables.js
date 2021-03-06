const { Database } = require('@jodu555/mysqlapi');
const database = Database.getDatabase();

function createTables() {

    database.createTable('accounts', {
        options: {
            K: ['UUID'],
            PK: 'UUID',
        },
        UUID: 'varchar(64)',
        username: 'TEXT',
        email: 'TEXT',
        password: 'TEXT',
    });

    database.createTable('product', {
        options: {
            PK: 'UUID',
        },
        UUID: 'varchar(64)',
        amazon_link: 'MEDIUMTEXT',
        product_data_UUID: 'varchar(64)',
        notification_cases: 'LONGTEXT',
    });

    database.createTable('product_data', {
        options: {
            K: ['UUID'],
            FK: {
                'UUID': 'product/UUID',
            },
        },
        UUID: 'varchar(64)',
        time: 'varchar(64)',
        title: 'TEXT',
        price: 'varchar(64)',
        rating: 'TEXT',
        descriptions: 'TEXT',
        specifications: 'TEXT',
        availability: 'TEXT',
        delivery: 'TEXT',
    });


}

module.exports = { createTables };