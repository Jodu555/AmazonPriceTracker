const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const HttpsProxyAgent = require('https-proxy-agent');

// getAmazonData('https://www.amazon.de/AZDelivery-UNO-R3-USB-Kabel-kompatibel/dp/B01MDJA464/?_encoding=UTF8&pd_rd_w=VCeTl&pf_rd_p=c043b718-4eed-4534-ac40-ef67c12daa6c&pf_rd_r=E10ZQCYPGC78NMFEGZP1&pd_rd_r=aeeb7a67-4fc8-40bf-ac71-c41eae06ba72&pd_rd_wg=M4HWa&ref_=pd_gw_ci_mcx_mr_hp_d');
getAmazonData('https://www.amazon.de/SUAOKI-Solargenerator-Lithium-Netzteil-Typ-C-Schnellladeanschluss-Notfall-Camping/dp/B07H84XFZ8')

/**
 * Math:
 * n products
 * in 1 year: n * 24*365
 *
 * 100: 876k
 * 400: 3.5 Million
 * 
 */

async function getAmazonData(URL) {
    const response = await fetch(URL, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const text = await response.text();
    if (text.includes('To discuss automated access to Amazon data please contact')) {
        console.log('Amazon access denied!');
        return;
    }

    const $ = cheerio.load(text);
    const price = $('span#priceblock_ourprice').text().trim();
    const title = $('span#productTitle').text().trim();
    let rating = $('[data-hook="rating-out-of-text"]').text();
    rating = {
        rating: rating.split(' von ')[0],
        max: rating.split(' von ')[1],
    };

    const $descirption = cheerio.load($('div#feature-bullets').html());
    const descirptions = [];
    $descirption('span.a-list-item').each((index, item) => {
        descirptions.push($descirption(item).text().trim());
    });

    const specifications = [];
    $('table#product-specification-table > tbody').each((index, item) => {
        $(item.children).each((i, child) => {
            if (i % 2 == 0) {
                specifications.push($(child).text().trim().replace(/\s/g, ' '));
            }

        });
    });

    const availability = $('div#availability span').text().trim()
    const delivery = $('div#mir-layout-DELIVERY_BLOCK-slot-DELIVERY_MESSAGE b').text().trim();

    // console.log(title, price, rating, infos, specifications);
    console.log('Title:', title);
    console.log('Price:', price);
    console.log('Rating:', rating);
    console.log('Descirption:', descirptions);
    console.log('Specifications:', specifications);
    console.log('Availability:', availability);
    console.log('Delivery:', delivery);
    console.log();
    const filename = (new Date().toLocaleString() + '.json').replaceAll(':', '-').replaceAll('/', '.');
    fs.writeFileSync(path.resolve(__dirname, filename), JSON.stringify({
        title,
        price,
        rating,
        descirptions,
        specifications,
        availability,
        delivery
    }, null, 2));
    console.log('Log Saved: ' + filename);
}