# HT16K33 for JavaScript

This package currently works with LED matrix backpacks with the HT16K33 controller chip specifically the Adafruit 8x8 monochrome, 8x8 bicolor and 16x8 monochrome LED Backpacks.

* 8x8 0.8" ([872](https://www.adafruit.com/products/872), [871](https://www.adafruit.com/products/871), [870](https://www.adafruit.com/products/870))
* 8x8 1.2" ([1049](https://www.adafruit.com/products/1049), [1052](https://www.adafruit.com/products/1052), [1051](https://www.adafruit.com/products/1051), [1050](https://www.adafruit.com/products/1050), [1614](https://www.adafruit.com/products/1614), [1632](https://www.adafruit.com/products/1632), [1857](https://www.adafruit.com/products/1857), [1854](https://www.adafruit.com/products/1854), [1855](https://www.adafruit.com/products/1855), [1856](https://www.adafruit.com/products/1856))
* 16x8 1.2" ([2044](https://www.adafruit.com/products/2044), [2038](https://www.adafruit.com/products/2038), [2037](https://www.adafruit.com/products/2037), [2040](https://www.adafruit.com/products/2040), [2041](https://www.adafruit.com/products/2041), [2039](https://www.adafruit.com/products/2039), [2043](https://www.adafruit.com/products/2043), [2042](https://www.adafruit.com/products/2042), [2035](https://www.adafruit.com/products/2035), [2036](https://www.adafruit.com/products/2036), [2052](https://www.adafruit.com/products/2052), [2054](https://www.adafruit.com/products/2054))
* 16x8 LED Matrix Driver Backpack ([1427](https://www.adafruit.com/products/1427))

This library was tested on on the [Small 1.2" 8x8 Ultra Bright Square White LED Matrix + Backpack, PRODUCT ID: 1857](https://www.adafruit.com/products/1857) and on the [16x8 1.2" Ultra Bright Square Green LED Matrix + Backpack](https://www.adafruit.com/products/2042).

This works with the 7-Segment backpacks and 14-segment alphanumeric backpacks.

## Example Code for 8 x 8 Matrix

![](docs/8x8.gif)

```javascript
import { connect8x8 } from '@thingssdk/HT16K33/espruino';

//Squint a little and you can see the faces!

// :)
const smileBmp = [
    0b00111100,
    0b01000010,
    0b10100101,
    0b10000001,
    0b10100101,
    0b10011001,
    0b01000010,
    0b00111100
];
//:|
const neutralBmp = [
    0b00111100,
    0b01000010,
    0b10100101,
    0b10000001,
    0b10111101,
    0b10000001,
    0b01000010,
    0b00111100
];
//:(
const frownBmp = [
    0b00111100,
    0b01000010,
    0b10100101,
    0b10000001,
    0b10011001,
    0b10100101,
    0b01000010,
    0b00111100
];

//Run Example Code
function main() {
    const matrix = connect8x8();

    //Draws Smiley Face
    matrix.render(smileBmp);

    //Draws Neutral Face after 1 second
    setTimeout(() => {
        matrix.render(neutralBmp);
    }, 1000);

    //Draws Frowny Face after 2 seconds
    setTimeout(() => {
        matrix.render(frownBmp);
    }, 11000);
}
```

## Example Code for 16 x 8 Matrix

![](docs/16x8.gif)

```javascript
import { connect16x8 } from '@thingssdk/HT16K33/espruino';

const matrix = connect16x8()
// Draw smile and frown side by side
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
// Draw smile and mehside by side
const smileMehBmp = [
    0b00111100, 0b00111100,
    0b01000010, 0b01000010,
    0b10100101, 0b10100101,
    0b10000001, 0b10000001,
    0b10100101, 0b10000001,
    0b10011001, 0b10111101,
    0b01000010, 0b01000010,
    0b00111100, 0b00111100
];

//Run Example Code
function main() {
    //Render bitmap of smily face and frown
    matrix.render(smileFrownBmp);

    //Render bitmap of smily face and meh face 
    setTimeout(() => matrix.render(smileMehBmp), 1000);
}
```


## Example Code for 8 x 8 Bi-Color Matrix

![](docs/8x8bicolor.gif)

```javascript
import { connect8x8bicolor } from '@thingssdk/HT16K33/espruino';

//Squint a little and you can see the faces!

// :) - Green
const smileBmp = [
    0b00111100, 0b00000000,
    0b01000010, 0b00000000,
    0b10100101, 0b00000000,
    0b10000001, 0b00000000,
    0b10100101, 0b00000000,
    0b10011001, 0b00000000,
    0b01000010, 0b00000000,
    0b00111100, 0b00000000
];
//:| - Orange
const neutralBmp = [
    0b00111100, 0b00111100,
    0b01000010, 0b01000010,
    0b10100101, 0b10100101,
    0b10000001, 0b10000001,
    0b10111101, 0b10111101,
    0b10000001, 0b10000001,
    0b01000010, 0b01000010,
    0b00111100, 0b00111100
];
//:( - Red
const frownBmp = [
    0b00000000, 0b00111100,
    0b00000000, 0b01000010,
    0b00000000, 0b10100101,
    0b00000000, 0b10000001,
    0b00000000, 0b10011001,
    0b00000000, 0b10100101,
    0b00000000, 0b01000010,
    0b00000000, 0b00111100
];
// :) - Multicolor Face
const multiSmileBmp = [
    0b00111100, 0b00000000,
    0b01000010, 0b00000000,
    0b10100101, 0b00100100,
    0b10000001, 0b00000000,
    0b10000001, 0b00100100,
    0b10000001, 0b00011000,
    0b01000010, 0b00000000,
    0b00111100, 0b00000000
];

//Run Example Code
function main() {
    const matrix = connect8x8bicolor();

    //Draws Smiley Face
    matrix.render(smileBmp);

    //Draws Neutral Face after 1 second
    setTimeout(() => {
        matrix.render(neutralBmp);
    }, 1000);

    //Draws Frowny Face after 2 seconds
    setTimeout(() => {
        matrix.render(frownBmp);
    }, 2000);

    //Draws Multicolor Face after 3 seconds
    setTimeout(() => {
        matrix.render(multiSmileBmp);
    }, 3000);
}
```

## Example Code for 7 Segment Display

![](docs/7segment.gif)

```javascript
import { connectSevenSegment } from '@thingssdk/HT16K33/espruino';

//Run Example Code
function main() {
    const matrix = connectSevenSegment();

    //You can render numbers
    matrix.render(42);

    //Negative numbers
    setTimeout(() => {
        matrix.render(-999);
    }, 1000);

    //Times and strings
    setTimeout(() => {
        matrix.render("04:20");
    }, 2000);

    //Numbers with decimal places
    setTimeout(() => {
        matrix.render(3.141);
    }, 3000);

    //Or strings with multiple dots
    setTimeout(() => {
        matrix.render("1.2.3.4.");
    }, 4000);

    //Even, just dashes
    setTimeout(() => {
        matrix.render("----");
    }, 5000);

    //Spaces are valid too
    setTimeout(() => {
        matrix.render("0  -");
    }, 6000);
}
```

## Example Code for 14 Segment Display

![](docs/14segment.gif)

```javascript
import { connectFourteenSegment } from '@thingssdk/HT16K33/espruino';

//Run Example Code
function main() {
    const matrix = connectFourteenSegment();

    //You can render numbers
    matrix.render(42);

    //Negative numbers
    setTimeout(() => {
        matrix.render(-999);
    }, 1000);

    //Letters and symbols
    setTimeout(() => {
        matrix.render("HI@U");
    }, 2000);

    //Numbers with decimal places
    setTimeout(() => {
        matrix.render(3.141);
    }, 3000);

    //Or strings with multiple dots
    setTimeout(() => {
        matrix.render("1.2.3.4.");
    }, 4000);

    //Uppercase letters
    setTimeout(() => {
        matrix.render("UPPR");
    }, 5000);

    //And lowercase
    setTimeout(() => {
        matrix.render("lowr");
    }, 6000);
}
```
