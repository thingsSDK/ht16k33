import { createMatrix } from './main';

/**
 * Rotates an 8-bit binary value right one bit.
 *
 * Example: 0b00000011 -> 0b10000001
 *
 * @param {number} value - 8-bit unsidgned integer (0-127).
 * @returns {uint8} rotated value
 */
function rotate(value) {
    //Shift everything right 1 bit
    //Then shift last bit over if switched on it'll switch on 2^7
    var rotated = (value >> 1) | (value << 7);
    //Casting the 16-bit integer to 8-bit
    var eightBitArray = new Uint8Array([rotated]);
    //return the 8-bit value
    return eightBitArray[0];
}

function formatBimap(bitmap) {
    const formattedBitmap = [];

    bitmap.forEach(function (i) {
        formattedBitmap.push(i);
        //Since the 8x8 Matrix chip can render on an 16x8 screen we have to write an empty byte
        formattedBitmap.push(0);
    });

    return formattedBitmap.map(rotate);
}

export default function connect(setup, write, address, brightness) {
    return createMatrix(setup, formatBimap, write, address, brightness);
}

