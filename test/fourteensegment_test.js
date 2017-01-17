import connect from '../fourteensegment';

import assert from 'assert';

describe('connect() fourteen / alphanumeric segment deisplay', () => {
    const setup = () => { };
    const frameFromValue = value => {
        const writeSequence = [];
        const write = (address, ...data) => writeSequence.push(data);
        const display = connect(setup, write, 0x70, 0);

        // Empty the array from the setup of the display so when we render we only have 
        // the frame.
        writeSequence.length = 0;
        display.render(value);

        // Unwraping display frame from the data structure
        const renderFrames = writeSequence.map(value => value[1]);
        return renderFrames[0];
    };

    it('should be a function', () => {
        assert.equal(typeof connect, 'function');
    });
    describe('display.render()', () => {
        it('should generate a display with a render method', () => {
            const frame1234 = frameFromValue(1234);
            // To render to the display it requires a data structure that is 4 values long.
            // 4 for each segment of the display
            assert.equal(frame1234.length, 4);
        });

        it('should render strings and numbers the same way', () => {
            const frameString = frameFromValue("1.234");
            const frameNumber = frameFromValue(1.234);
            assert.deepEqual(frameString, frameNumber);
        });

        it('should render letters', () => {
            const dogeFrame = frameFromValue("DOGE");
            assert.deepEqual(dogeFrame, [
                [0b00001111, 0b00010010], [0b00111111, 0b00000000], [0b10111101, 0b00000000], [0b11111001, 0b00000000]
            ]);
        });

        
        it('should render arrays', () => {
            const dogeFrame = frameFromValue(["D","O","G","E"]);
            assert.deepEqual(dogeFrame, [
                [0b00001111, 0b00010010], [0b00111111, 0b00000000], [0b10111101, 0b00000000], [0b11111001, 0b00000000]
            ]);
        });


        it('should render minus symbols if present', () => {
            const minusSixHundredAndSeventryEightFrame = frameFromValue(-678);
            assert.deepEqual(minusSixHundredAndSeventryEightFrame, [
                [0b11000000, 0b00000000], [0b11111101, 0b00000000], [0b00000111, 0b00000000], [0b11111111, 0b00000000]
            ]);
        });

        it('should render numbers right justified', () => {
            const eightFrame = frameFromValue(8);
            assert.deepEqual(eightFrame, [[0, 0], [0, 0], [0, 0], [0b11111111, 0b00000000]]);
            const eighteenFrame = frameFromValue(18);
            assert.deepEqual(eighteenFrame, [[0, 0], [0, 0], [0b00000110, 0b00000000], [0b11111111, 0b00000000]]);
        });
    });
});