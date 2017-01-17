import { setBlinkRate } from '../main';
import { TURN_DISPLAY_ON } from '../common';

import assert from 'assert';

describe('setBlinkRate(matrix, blinkRate)', () => {
    it('should be a function', () => {
        assert.equal(typeof setBlinkRate, 'function');
    });

    it('should only write values between 0 and 3', () => {
        const blinkRateData = [];
        const mock = { write: value => blinkRateData.push(value) };
        setBlinkRate(mock, 0);
        setBlinkRate(mock, 3);
        // Should be the equivolent of 0
        setBlinkRate(mock, 4);
        // Should be the equivolent of 1
        setBlinkRate(mock, 5);
        // Should be the equivolent of 3
        setBlinkRate(mock, -1);

        assert.deepEqual(blinkRateData, [0, 3, 0, 1, 3].map(v => TURN_DISPLAY_ON | v << 1));
    });
});