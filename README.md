# HT16K33 for JavaScript

This package currently works with LED matrix backpacks with the HT16K33 controller chip specifically the Adafruit 8x8 monochrome, 8x8 bicolor and 16x8 monochrome LED Backpacks.

* 8x8 0.8" ([872](https://www.adafruit.com/products/872), [871](https://www.adafruit.com/products/871), [870](https://www.adafruit.com/products/870))
* 8x8 1.2" ([1049](https://www.adafruit.com/products/1049), [1052](https://www.adafruit.com/products/1052), [1051](https://www.adafruit.com/products/1051), [1050](https://www.adafruit.com/products/1050), [1614](https://www.adafruit.com/products/1614), [1632](https://www.adafruit.com/products/1632), [1857](https://www.adafruit.com/products/1857), [1854](https://www.adafruit.com/products/1854), [1855](https://www.adafruit.com/products/1855), [1856](https://www.adafruit.com/products/1856))
* 16x8 1.2" ([2044](https://www.adafruit.com/products/2044), [2038](https://www.adafruit.com/products/2038), [2037](https://www.adafruit.com/products/2037), [2040](https://www.adafruit.com/products/2040), [2041](https://www.adafruit.com/products/2041), [2039](https://www.adafruit.com/products/2039), [2043](https://www.adafruit.com/products/2043), [2042](https://www.adafruit.com/products/2042), [2035](https://www.adafruit.com/products/2035), [2036](https://www.adafruit.com/products/2036), [2052](https://www.adafruit.com/products/2052), [2054](https://www.adafruit.com/products/2054))
* 16x8 LED Matrix Driver Backpack ([1427](https://www.adafruit.com/products/1427))

This library was tested on on the [Small 1.2" 8x8 Ultra Bright Square White LED Matrix + Backpack, PRODUCT ID: 1857](https://www.adafruit.com/products/1857) and on the [16x8 1.2" Ultra Bright Square Green LED Matrix + Backpack](https://www.adafruit.com/products/2042).

This works with the 7-Segment backpacks and 14-segment alphanumeric backpacks.

## Example Code for 8 x 8 Matrix

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

  //Draws Neutral Face after 1/2 second
  setTimeout(() => {
    matrix.render(neutralBmp);
  }, 500);

  //Draws Frowny Face
  setTimeout(() =>{
    matrix.render(frownBmp);
  }, 1000);
}
```

Here's a gif of the above code in action:

![](8x8.gif)

## Example Code for 16 x 8 Matrix

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

//Run Example Code
function main() {
  matrix.render(smileFrownBmp);
}
```
![](smile_frown.jpg)


## Example Code for 7 Segment Display

```javascript

```

## Example Code for 14 Segment Display

```javascript

```
