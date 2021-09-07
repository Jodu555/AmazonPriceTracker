
console.log(decodeDeliveryDate('10. - 13. Sept.'));
console.log(isValidChange(decodeDeliveryDate('Montag, 6. Sept.'), decodeDeliveryDate('Dienstag, 7. Sept.')));
console.log(isValidChange(decodeDeliveryDate('Montag, 15. Sept.'), decodeDeliveryDate('Dienstag, 17. Sept.')));
console.log(isValidChange(decodeDeliveryDate('Montag, 30. Sept.'), decodeDeliveryDate('Dienstag, 1. Oct.')));
console.log(isValidChange(decodeDeliveryDate('Montag, 15. Sept.'), decodeDeliveryDate('Dienstag, 16. Oct.')));

// console.log(decodeDeliveryDate('Mittwoch, 8. Sept.'));

function decodeDeliveryDate(deliveryDate) {
    if (deliveryDate.includes('-'))
        return {
            break: true,
        }
    return {
        day: deliveryDate.split(',')[0].trim(),
        numday: deliveryDate.split('.')[0].split(',')[1].trim(),
        month: deliveryDate.split('.')[1].trim(),
    };
}

function isValidChange(from, to) {
    return (
        (+from.numday + 1 == to.numday && from.month == to.month) ||
        (from.numday >= daysInMonth(months.indexOf(from.month + 1)) &&
            to.month == getNext(months, months.indexOf(from.month)))
    );
}

function daysInMonth(month) {
    return new Date(new Date(Date.now()).getFullYear(), month, 0).getDate();
}

function getNext(arr, index) {
    while (index + 1 >= arr.length)
        index = index - arr.length;
    return arr[index + 1];
}
