import { DEFAULT_ADDRESS } from './common';
import connect8by8 from './matrix8x8';
import connect16by8 from './matrix16x8';
import connect8by8bicolor from './matrix8x8bicolor';


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
    i2cInterface = options.i2cInterface || I2C1;
    clock = options.clock || 5;
    data = options.data || 4;
    address = options.address || DEFAULT_ADDRESS;
    brightness = options.brightness || 0;
    const setup = createSetup(i2cInterface, clock, data);
    const write = createWrite(i2cInterface);
    return createDisplay(setup, write, address, brightness);
}

export function connect8x8(options) {
    return connect(connect8by8, options);
}

export function connect16x8(options) {
    return connect(connect16by8, options);
}

export function connect8x8bicolor(options) {
    return connect(connect8by8bicolor, options);
}