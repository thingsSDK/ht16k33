import {createMatrix }from './main'; 

function fixBitmap(bitmap, switchColonOff) {
    let newBitmap = bitmap
        .filter(value => value !== undefined)
        .map(num => num); 

    for (var i = newBitmap.length; i < 4; i ++ ) {
        newBitmap.unshift([0, 0]); 
    }

    if (switchColonOff) {
        newBitmap.splice(2, 0, [0, 0]); 
    }else {
        newBitmap.splice(2, 0, [0x02, 0]); 
    }
    return newBitmap; 
}

function charToSevenSegment(char, i, array) {
    const NUMBERS = [
        0x3F, // 0
        0x06, // 1
        0x5B, // 2
        0x4F, // 3
        0x66, // 4
        0x6D, // 5
        0x7D, // 6
        0x07, // 7
        0x7F, // 8
        0x6F  // 9
    ]; 

    const MINUS = 0x40; 
    
    if (char === '.') {
        return [charToSevenSegment(array[i - 1])[0] | 1 << 7, 0]; 
    }else if (char === ':') {
        return undefined; 
    }else if (char === '-') {
        return [MINUS, 0]; 
    }else if (char === ' ') {
        return [0, 0]; 
    }else {
        return [NUMBERS[Number(char)], 0]; 
    }
}

function format(numberOrStringOrArray) {
    const stringRep = Array.isArray(numberOrStringOrArray)?numberOrStringOrArray.join(''):numberOrStringOrArray.toString(); 
    const chars = stringRep.split(''); 
    const bitmap = chars.map(charToSevenSegment); 
    const dotIndicies = chars.map((value, i) => value === '.'?i:-1).filter(value => value != -1); 
    dotIndicies.forEach(value => delete bitmap[value - 1]); 
    return fixBitmap(bitmap, chars.indexOf(':') === -1); 
}

export default function connect(setup, write, address, brightness) {
    return createMatrix(setup, format, write, address, brightness); 
}