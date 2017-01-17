import connect from '../matrix8x8';

import assert from 'assert';

describe('connect() 8 by 8 monochrome display', () => {
    it('should be a function', () => {
        assert.equal(typeof connect, 'function');
    });

    describe('display.render()', () => {

        it('should have all bytes rotated right', () => {
            const setup = () => { };
            const writeSequence = [];
            const display = connect(setup, (address, ...data) => writeSequence.push(data), 0x70, 0);
            // Empty the array from the setup of the display so when we render we only have 
            // the frame.
            writeSequence.length = 0;
            const smileBitmap = [
                0b00111100,
                0b01000010,
                0b10000001,
                0b10000001,
                0b10100101,
                0b10011001,
                0b01000010,
                0b00111100
            ];
            const rotatedSmileBitmap = [
                0b00011110, 0,
                0b00100001, 0,
                0b11000000, 0,
                0b11000000, 0,
                0b11010010, 0,
                0b11001100, 0,
                0b00100001, 0,
                0b00011110, 0,
            ];


            display.render(smileBitmap);

            // Unwrap the frame from the data writing 
            const frame = writeSequence[0][1];
            assert.deepEqual(frame, rotatedSmileBitmap);
        });
    });
});