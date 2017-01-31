import { TURN_DISPLAY_ON, TURN_OSCILLATOR_ON, SET_BRIGHTNESS } from './common';

const MAX_BRIGHTNESS = 15;
const MAX_BLINK_RATE = 3;

export function createMatrix(setup, format, write, address, brightness) { 
    const matrix = {
        render: bitmap => write(address, 0, format(bitmap)),
        write: (...data) => write(address, ...data)
    };

    setup();
    matrix.write(TURN_OSCILLATOR_ON);
    matrix.write(TURN_DISPLAY_ON);
    setBrightness(matrix, brightness);

    return matrix;
}

/**
 *  Set the brightness of the LEDs. A number 0 through 15.
 * 
 * @export
 * @param {Object} matrix - the configured display
 * @param {number} brightness - brightness 0 through 15
 */
export function setBrightness(matrix, brightness) {
    matrix.write(SET_BRIGHTNESS | brightness & MAX_BRIGHTNESS);
}

/**
 *  Set the blink rate of the display. A number 0 through 3.
 * 
 * @export
 * @param {Object} matrix - the configured display
 * @param {number} rate - brightness 0 through 3
 */
export function setBlinkRate(matrix, rate) {
    matrix.write(TURN_DISPLAY_ON | (rate & MAX_BLINK_RATE) << 1);
}
