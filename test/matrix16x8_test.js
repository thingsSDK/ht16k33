import connect from '../matrix16x8';

import assert from 'assert';

describe('connect() 16 by 8 monochrome display', () => {
    it('should be a function', () => {
        assert.equal(typeof connect, 'function');
    });

    describe('display.render()', () => {
        it('should not effect the the underlying bytes', () => {
            const setup = () => { };
            const writeSequence = [];
            const display = connect(setup, (address, ...data) => writeSequence.push(data), 0x70, 0);
            // Empty the array from the setup of the display so when we render we only have 
            // the frame.
            writeSequence.length = 0;
            const smileFrownBmp = [
                0b00111100, 0b00111100,
                0b01000010, 0b01000010,
                0b10100101, 0b10100101,
                0b10000001, 0b10000001,
                0b10100101, 0b10011001,
                0b10011001, 0b10100101,
                0b01000010, 0b01000010,
                0b00111100, 0b00111100
            ];
            
            display.render(smileFrownBmp);

            // Unwrap the frame from the data writing 
            const frame = writeSequence[0][1];
            assert.deepEqual(frame, smileFrownBmp);
        });
    });
});