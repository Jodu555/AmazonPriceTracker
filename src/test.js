const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samsatg', 'Sonntag'];

console.log(isValidChange(decodeDeliveryDate('Montag, 6. Sept.'), decodeDeliveryDate('Dienstag, 7. Sept.')));
console.log(isValidChange(decodeDeliveryDate('Montag, 15. Sept.'), decodeDeliveryDate('Dienstag, 17. Sept.')));
console.log(isValidChange(decodeDeliveryDate('Montag, 30. Sept.'), decodeDeliveryDate('Dienstag, 1. Oct.')));
console.log(isValidChange(decodeDeliveryDate('Montag, 15. Sept.'), decodeDeliveryDate('Dienstag, 16. Oct.')));

// console.log(decodeDeliveryDate('Mittwoch, 8. Sept.'));


function decodeDeliveryDate(deliveryDate) {
    const day = deliveryDate.split(',')[0].trim();
    const numday = deliveryDate.split('.')[0].split(',')[1].trim();
    const month = deliveryDate.split('.')[1].trim();
    return {
        day,
        numday,
        month,
    }
}

function isValidChange(from, to) {
    //+ before to cast to Number
    //TODO: Maybe concat all these ifs together
    if (+from.numday + 1 == to.numday && from.month == to.month) {
        return true
    }
    if (from.numday >= daysInMonth(months.indexOf(from.month + 1))) {
        if (to.month == getNext(months, months.indexOf(from.month))) {
            return true
        }
    }
    return false;
}

function daysInMonth(month) {
    return new Date(new Date(Date.now()).getFullYear(), month, 0).getDate();
}

function getNext(arr, index) {
    while (index + 1 >= arr.length) {
        index = index - arr.length;
    }
    return arr[index + 1];
}