import connect from '../matrix8x8bicolor';

import assert from 'assert';

describe('connect() 8 by 8 bi color display', () => {
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
            const biColorSmileBitmap = [
                0b00111100, 0b00000000,
                0b01000010, 0b00000000,
                0b10000001, 0b00100100,
                0b10000001, 0b00000000,
                0b10100101, 0b00100100,
                0b10011001, 0b00011000,
                0b01000010, 0b00000000,
                0b00111100, 0b00000000
            ];

            display.render(biColorSmileBitmap);

            // Unwrap the frame from the data writing 
            const frame = writeSequence[0][1];
            assert.deepEqual(frame, biColorSmileBitmap);
        });
    });
});