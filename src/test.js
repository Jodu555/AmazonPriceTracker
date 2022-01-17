const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
];
const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samsatg', 'Sonntag'];

console.log(decodeDeliveryDate('10. - 13. Sept.'));
console.log(isValidChange(decodeDeliveryDate('Montag, 6. Sept.'), decodeDeliveryDate('Dienstag, 7. Sept.')));
console.log(isValidChange(decodeDeliveryDate('Montag, 15. Sept.'), decodeDeliveryDate('Dienstag, 17. Sept.')));
console.log(isValidChange(decodeDeliveryDate('Montag, 30. Sept.'), decodeDeliveryDate('Dienstag, 1. Oct.')));
console.log(isValidChange(decodeDeliveryDate('Montag, 15. Sept.'), decodeDeliveryDate('Dienstag, 16. Oct.')));

console.log(isValidChange(decodeDeliveryDate('9. - 10. Sept.'), decodeDeliveryDate('10. - 11. Sept.')));
console.log(isValidChange(decodeDeliveryDate('Nicht verfügbar'), decodeDeliveryDate('10. - 11. Sept.')));

// console.log(decodeDeliveryDate('Mittwoch, 8. Sept.'));

function decodeDeliveryDate(deliveryDate) {
    if (!deliveryDate)
        return { break: true }
    try {
        if (deliveryDate.includes('Morgen'))
            return { break: true }
        if (deliveryDate.includes('-'))
            return {
                month: deliveryDate.split('-')[1].split('.')[1].trim(),
                numday: deliveryDate.split('-')[0].split('.')[0].trim(),
                dashed: true,
            }
        return {
            day: deliveryDate.split(',')[0].trim(),
            numday: deliveryDate.split('.')[0].split(',')[1].trim(),
            month: deliveryDate.split('.')[1].trim(),
        };
    } catch (error) {
        console.log('Decoding Delivery Date failed: ' + deliveryDate);
        return { break: true }
    }
}

function isValidChange(from, to) {
    if (from.break && to.break)
        return { value: false, significant: false };
    if (from.break || to.break) {
        return { value: true, significant: true };
    }
    return {
        value: (
            (+from.numday + 1 == to.numday && from.month == to.month) ||
            (from.numday >= daysInMonth(months.indexOf(from.month + 1)) &&
                to.month == getNext(months, months.indexOf(from.month)))
        ), significant: false
    };
}

function daysInMonth(month) {
    return new Date(new Date(Date.now()).getFullYear(), month, 0).getDate();
}

function getNext(arr, index) {
    while (index + 1 >= arr.length)
        index = index - arr.length;
    return arr[index + 1];
}
