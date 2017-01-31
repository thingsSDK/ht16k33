import { DEFAULT_ADDRESS } from './common';
import matrix8x8 from './matrix8x8';
import matrix16x8 from './matrix16x8';
import bicolorMatrix from './matrix8x8bicolor';
import sevenSegment from './sevensegment';
import fourteenSegment from './fourteensegment';


function createSetup(i2cInterface, clock, data) {
    return () => {
        i2cInterface.setup({ scl: clock, sda: data });
    };
}

function createWrite(i2cInterface) {
    return (address, ...data) => {
        i2cInterface.writeTo(address, ...data);
    };
}

function connect(createDisplay, options) {
    options = options || {};
    const i2cInterface = options.i2cInterface || I2C1;
    const clock = options.clock || 5;
    const data = options.data || 4;
    const address = options.address || DEFAULT_ADDRESS;
    const brightness = options.brightness || 0;
    const setup = createSetup(i2cInterface, clock, data);
    const write = createWrite(i2cInterface);
    return createDisplay(setup, write, address, brightness);
}

export function connect8x8Matrix(options) {
    return connect(matrix8x8, options);
}

export function connect16x8Matrix(options) {
    return connect(matrix16x8, options);
}

export function connect8x8BicolorMatrix(options) {
    return connect(bicolorMatrix, options);
}

export function connect7SegmentDisplay(options) {
    return connect(sevenSegment, options);
}

export function connect14SegmentDisplay(options) {
    return connect(fourteenSegment, options);
}