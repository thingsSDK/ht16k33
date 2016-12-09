import { createMatrix } from './main';

export default function connect(setup, write, address, brightness) {
    return createMatrix(setup, bitmap => bitmap, write, address, brightness);
}

