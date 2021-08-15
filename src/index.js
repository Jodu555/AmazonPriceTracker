const { getAmazonData } = require('./utils/amazon');

const { Database } = require('@jodu555/mysqlapi');
const database = Database.createDatabase('localhost', 'root', '', 'amazonPriceTracker');
database.connect();

const { createTables } = require('./utils/tables');

createTables();



// amazonPriceTracker

// getAmazonData('https://www.amazon.de/AZDelivery-UNO-R3-USB-Kabel-kompatibel/dp/B01MDJA464/?_encoding=UTF8&pd_rd_w=VCeTl&pf_rd_p=c043b718-4eed-4534-ac40-ef67c12daa6c&pf_rd_r=E10ZQCYPGC78NMFEGZP1&pd_rd_r=aeeb7a67-4fc8-40bf-ac71-c41eae06ba72&pd_rd_wg=M4HWa&ref_=pd_gw_ci_mcx_mr_hp_d');
// getAmazonData('https://www.amazon.de/SUAOKI-Solargenerator-Lithium-Netzteil-Typ-C-Schnellladeanschluss-Notfall-Camping/dp/B07H84XFZ8')



/**
 * Math:
 * n products
 * in 1 year: n * 24*365
 *
 * 100: 876k
 * 400: 3.5 Million
 *
 */

