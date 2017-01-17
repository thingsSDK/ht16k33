import { setBrightness } from '../main';
import { SET_BRIGHTNESS } from '../common';

import assert from 'assert';

describe('setBrightness(matrix, brightness)', () => {
    it('should be a function', () => {
        assert.equal(typeof setBrightness, 'function');
    });

    it('should only write values between 0 and 15', () => {
        const brightnessData = [];
        const mock = { write: value => brightnessData.push(value) };
        setBrightness(mock, 0);
        setBrightness(mock, 15);
        // Should be the equivolent of 0
        setBrightness(mock, 16);
        // Should be the equivolent of 1
        setBrightness(mock, 17);
        // Should be the equivolent of 15
        setBrightness(mock, -1);

        assert.deepEqual(brightnessData, [0, 15, 0, 1, 15].map(v => SET_BRIGHTNESS | v));
    });
});