console.log(decodeDeliveryDate('Montag, 6. Sept.'));
console.log(decodeDeliveryDate('Dienstag, 7. Sept.'));
console.log(decodeDeliveryDate('Mittwoch, 8. Sept.'));

function decodeDeliveryDate(deliveryDate) {
    const day = deliveryDate.split(',')[0].trim();
    const numday = deliveryDate.split('.')[0].split(',')[1].trim();
    const month = deliveryDate.split('.')[1].trim();

    console.log('Tag:', day, 'Nummer-Tag:', numday, 'Monat:', month);
}