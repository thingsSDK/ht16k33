import { createMatrix } from '../main';
import { TURN_DISPLAY_ON, TURN_OSCILLATOR_ON, SET_BRIGHTNESS } from '../common';

import assert from 'assert';

describe('createMatrix', () => {
  const brightness = 1;
  const initialDataSequenceOnSetup = [TURN_OSCILLATOR_ON, TURN_DISPLAY_ON, SET_BRIGHTNESS | brightness];

  const setup = () => { };
  const format = () => { };

  it('should be a function', () => {
    assert.equal(typeof createMatrix, 'function');
  });

  it('should turn the oscellator on, then display, then set brightness', () => {

    const writeArray = [];
    const write = (address, ...data) => writeArray.push({ address, data: data });

    const address = 0x70;

    const matrix = createMatrix(setup, format, write, address, brightness);
    const dataSequence = writeArray.map(writeCall => writeCall.data[0]);

    assert.deepEqual(dataSequence, initialDataSequenceOnSetup);
  });

  it('should be able to create two displays with seperate different addresses', () => {

    const writeArray = [];
    const write = (address, ...data) => writeArray.push({ address, data: data });

    const address1 = 0x70;
    const address2 = 0x71;

    const matrix1 = createMatrix(setup, format, write, address1, brightness);
    const matrix2 = createMatrix(setup, format, write, address2, brightness);
    
    const addressSequence = writeArray.map(writeCall => writeCall.address);
    const dataSequence = writeArray.map(writeCall => writeCall.data[0]);
    // Each display should have 3 calls hence 3 x 0x70 and 3 x 0x71
    assert.deepEqual(addressSequence, [0x70, 0x70, 0x70, 0x71, 0x71, 0x71]);
    // Each display should have the initialDataSequenceOnSetup so it should be repeated once per display
    assert.deepEqual(dataSequence, [...initialDataSequenceOnSetup, ...initialDataSequenceOnSetup]);
  });

});