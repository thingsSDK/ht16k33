import connect from '../sevensegment';

import assert from 'assert';

describe('connect() seven segment display', () => {
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
        return renderFrames[0].map(v => v[0]);
    };

    it('should be a function', () => {
        assert.equal(typeof connect, 'function');
    });

    describe('display.render()', () => {
        it('should generate a display with a render method', () => {
            const frame1234 = frameFromValue(1234);
            // To render to the display it requires a data structure that is 5 values long.
            // 1 for the colon (on or off) and 4 others for each segment of the display
            assert.equal(frame1234.length, 5);
        });

        it('should render strings and numbers the same way', () => {
            const frameString = frameFromValue('1.2341');
            const frameNumber = frameFromValue(1.234);
            assert.deepEqual(frameString, frameNumber);
        });

        it('should render colons if present', () => {
            const timeFrame = frameFromValue('23:19');
            assert.deepEqual(timeFrame, [0x5B, 0x4F, 0x02, 0x06, 0x6F]);
        });

        it('should render minus symbols if present', () => {
            const minusSixHundredAndSeventryEightFrame = frameFromValue(-678);
            assert.deepEqual(minusSixHundredAndSeventryEightFrame, [0x40, 0x7D, 0x00, 0x07, 0x7F]);
        });

        it('should render numbers right justified', () => {
            const eightFrame = frameFromValue(8);
            assert.deepEqual(eightFrame, [0, 0, 0, 0, 0x7F]);
            const eighteenFrame = frameFromValue(18);
            assert.deepEqual(eighteenFrame, [0, 0, 0, 0x06, 0x7F]);
        });

        it('should be able to render a space in the middle of the display', () => {
            const frameWithSpaceInMiddle = frameFromValue('1  2');
            assert.deepEqual(frameWithSpaceInMiddle, [0x06, 0, 0, 0, 0x5B]);
        });

        it('should be able to render arrays', () => {
            const frameFromArray = frameFromValue(['2', '3', ':', '1', '9']);
            assert.deepEqual(frameFromArray, [0x5B, 0x4F, 0x02, 0x06, 0x6F]);
        });
    });
});