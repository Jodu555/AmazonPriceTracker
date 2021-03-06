const fetch = require('node-fetch');
const cheerio = require('cheerio');
const HttpsProxyAgent = require('https-proxy-agent');

async function getAmazonData(URL) {
    const response = await fetch(URL, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const text = await response.text();
    if (text.includes('To discuss automated access to Amazon data please contact')) {
        console.log('Amazon access denied!');
        return { denied: true };
    }

    const $ = cheerio.load(text);
    const price = $('span#priceblock_ourprice').text().trim();
    const title = $('span#productTitle').text().trim();
    let rating = $('[data-hook="rating-out-of-text"]').text();
    rating = {
        rating: rating.split(' von ')[0],
        max: rating.split(' von ')[1],
    };

    const $description = cheerio.load($('div#feature-bullets').html());
    const descriptions = [];
    $description('span.a-list-item').each((index, item) => {
        descriptions.push($description(item).text().trim());
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

    const data = {
        title,
        price,
        rating,
        descriptions,
        specifications,
        availability,
        delivery
    }
    return data;
}

module.exports = {
    getAmazonData,
}