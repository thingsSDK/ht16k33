# espruino-adafruit-led-backpack

This is a driver that closely mirrors the [Adafruit's LED Backpack Library](https://github.com/adafruit/Adafruit-LED-Backpack-Library).

This package currently works with Adafruit 8x8 and 16x8 Single Color LED Backpacks.

* 8x8 0.8" ([872](https://www.adafruit.com/products/872), [871](https://www.adafruit.com/products/871), [870](https://www.adafruit.com/products/870))
* 8x8 1.2" ([1049](https://www.adafruit.com/products/1049), [1052](https://www.adafruit.com/products/1052), [1051](https://www.adafruit.com/products/1051), [1050](https://www.adafruit.com/products/1050), [1614](https://www.adafruit.com/products/1614), [1632](https://www.adafruit.com/products/1632), [1857](https://www.adafruit.com/products/1857), [1854](https://www.adafruit.com/products/1854), [1855](https://www.adafruit.com/products/1855), [1856](https://www.adafruit.com/products/1856))
* 16x8 1.2" ([2044](https://www.adafruit.com/products/2044), [2038](https://www.adafruit.com/products/2038), [2037](https://www.adafruit.com/products/2037), [2040](https://www.adafruit.com/products/2040), [2041](https://www.adafruit.com/products/2041), [2039](https://www.adafruit.com/products/2039), [2043](https://www.adafruit.com/products/2043), [2042](https://www.adafruit.com/products/2042), [2035](https://www.adafruit.com/products/2035), [2036](https://www.adafruit.com/products/2036), [2052](https://www.adafruit.com/products/2052), [2054](https://www.adafruit.com/products/2054))
* 16x8 LED Matrix Driver Backpack ([1427](https://www.adafruit.com/products/1427))

This library was tested on on the [Small 1.2" 8x8 Ultra Bright Square White LED Matrix + Backpack, PRODUCT ID: 1857](https://www.adafruit.com/products/1857) and on the [16x8 1.2" Ultra Bright Square Green LED Matrix + Backpack](https://www.adafruit.com/products/2042).

This **doesn't** work with the 7-Segment backpacks.

## Example Code for 8 x 8 Matrix

To use this library in the Espruino Web IDE you need to go to `Settings > Communications > Check 'Load modules from NPM (BETA)'`.

Here's some example code that mirrors the Adafruit's example code for [the 8x8 Matrix example code for Arduino](https://github.com/adafruit/Adafruit-LED-Backpack-Library/blob/master/examples/matrix8x8/matrix8x8.ino).

```javascript
var Matrix8x8 = require("espruino-adafruit-led-backpack").Matrix8x8;

//Clock: B6 Data: B7 Device Address: 0x70, Brightness: 0-15
var matrix = new Matrix8x8({scl:B6, sda:B7, address:0x70, brightness: 0});

//Squint a little and you can see the faces!

// :)
var smileBmp = [
    0b00111100,
    0b01000010,
    0b10100101,
    0b10000001,
    0b10100101,
    0b10011001,
    0b01000010,
    0b00111100
],
//:|
    neutralBmp = [
    0b00111100,
    0b01000010,
    0b10100101,
    0b10000001,
    0b10111101,
    0b10000001,
    0b01000010,
    0b00111100
],
//:(
  frownBmp = [
    0b00111100,
    0b01000010,
    0b10100101,
    0b10000001,
    0b10011001,
    0b10100101,
    0b01000010,
    0b00111100
];

//Hacky scynchronous timeout :)
function delay(time) {
  var i = 0;
  while(i < time * 10) {  i++; }
}

//Run Example Code
function testDisplay() {
  //Draws Smiley Face
  matrix.clear();
  matrix.drawBitmap(smileBmp);
  matrix.writeDisplay();
  delay(500);

  //Draws Neutral Face
  matrix.clear();
  matrix.drawBitmap(neutralBmp);
  matrix.writeDisplay();
  delay(500);

  //Draws Frowny Face
  matrix.clear();
  matrix.drawBitmap(frownBmp);
  matrix.writeDisplay();
  delay(500);

  //Draws a pixel at the top left x = 0, y = 0
  matrix.clear();
  matrix.drawPixel(0, 0);
  matrix.writeDisplay();
  delay(500);

  //Draws a diagonal line between x1 = 0, y1 = 0 and x2 = 7, y2 = 7
  matrix.clear();
  matrix.drawLine(0,0, 7,7);
  matrix.writeDisplay();
  delay(500);

  //Draws a rectangle at x = 0, y = 0 and a witdth = 8 and height = 8
  matrix.clear();
  matrix.drawRect(0,0, 8,8);
  matrix.writeDisplay();
  delay(500);

  //Draws the same rectangle as abover with a filled in rectangle 4 by 4 starting at x = 2, y = 2
  matrix.clear();
  matrix.drawRect(0,0, 8,8);
  matrix.fillRect(2,2, 4,4);
  matrix.writeDisplay();
  delay(500);
}

testDisplay();
```

Here's a gif of the above code in action:

![](8x8.gif)

## Example Code for 16x8 Matrix

```javascript
var Matrix16x8 = require("espruino-adafruit-led-backpack").Matrix16x8;

var matrix = new Matrix16x8({scl:B6, sda:B7, address:0x70, brightness: 0});

// draw smile and frown side by side
var smileFrownBmp = [
    0b00111100, 0b00111100,
    0b01000010, 0b01000010,
    0b10100101, 0b10100101,
    0b10000001, 0b10000001,
    0b10100101, 0b10011001,
    0b10011001, 0b10100101,
    0b01000010, 0b01000010,
    0b00111100, 0b00111100
];

matrix.clear();
matrix.drawBitmap(smileFrownBmp);
matrix.writeDisplay();
```
![](smile_frown.jpg)

The functions `drawLine`, `drawPixel`, `drawRect` and `fillRect` work the same as for the 8x8 Matrix except you can address up to 16 pixels on the x axis:

```javascript
// Draws a diagonal line between x1 = 3, y1 = 3 and x2 = 15, y2 = 7
matrix.drawLine(3, 3, 15, 7);
```


## Todos - A.K.A. Please Help
- [ ] Finish Parity for 8 x 8 Display
  - [ ] `drawCircle()`
  - [ ] `setTextWrap()`
  - [ ] `setTextColor()`
  - [ ] `setCursor()`
  - [ ] `print()`
  - [ ] `setRotation()`
- [ ] Implement 7 Segment Display