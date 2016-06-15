/**
 * Constructor for Adafruit LED Matrix Backpacks which can be used as a base for 8x8 and 16x8 matrices.
 * Provides drawing capabilities like the Adafruit Arduino Library API.
 *
 * @param options. An object literal with the keys of `scl` and `sda` for the clock and data I2C pins. The option `address`
 * is a hexadecimal address of the device. A 7-bit address between 0x70-0x77. The key `brightness` is a number 0 through 15.
 * @constructor
 */
function Matrix(options) {
    if(typeof options.scl === "undefined" ||
        typeof options.sda === "undefined" ||
        typeof options.brightness === "undefined" ||
        typeof options.address === "undefined") {
        throw new Error("Required option of `scl`, `sda`, `brightness` and/or `address` is missing.");
    }
    this.address = options.address;
    I2C1.setup({scl: options.scl, sda: options.sda });
    I2C1.writeTo(this.address, 0x21); // turn on oscillator
    I2C1.writeTo(this.address, 0x81); // disp on
    this.setBrightness(options.brightness);
    this.context = Graphics.createArrayBuffer(16,8,1);
}


/**
 * Set the brightnes of the LEDs. A number 0 through 15.
 * @param brightness
 */
Matrix.prototype.setBrightness = function(brightness) {
    // brightness 0-15
    I2C1.writeTo(this.address, 0xE0 | brightness);
};


/**
 * Renders buffer/graphics context to the display.
 */
Matrix.prototype.render = function() {
    I2C1.writeTo(this.address, 0, this.context.buffer);
};


/**
 * Rotates an 8-bit binary value right one bit.
 *
 * Example: 0b00000011 -> 0b10000001
 *
 * @param value. 8-bit unsidgned integer (0-127).
 * @returns {uint8} rotated value
 */
Matrix.prototype.rotate = function(value) {
    //Shift everything right 1 bit
    //Then shift last bit over if switched on it'll switch on 2^7
    var rotated = (value >> 1) | (value << 7);
    //Casting the 16-bit integer to 8-bit
    var eightBitArray = new Uint8Array([rotated]);
    //return the 8-bit value
    return eightBitArray[0];
};


/**
 * Clears graphics buffer.
 */
Matrix.prototype.clear = function() {
    this.context.clear();
};


/**
 * Same as `render()`.
 */
Matrix.prototype.writeDisplay = function(){
    this.render();
};


/**
 * Draws a pixel at the co-ordinates.
 * @param x is the x co-ordinate. 0-7.
 * @param y is the y co-ordinate. 0-7.
 * @param state. 1 for on. 0 for off.
 */
Matrix.prototype.drawPixel = function (x, y, state) {
    this.context.setPixel(x, y, state);
};


/**
 * Draws a line from one set of co-ordinates to another
 *
 * @param x1 is the x value for the first set of co-ordinates
 * @param y1 is the y value for the first set of co-ordinates
 * @param x2 is the x value for the second set of co-ordinates
 * @param y2 is the y value for the second set of co-ordinates
 */
Matrix.prototype.drawLine = function(x1, y1, x2, y2) {
    this.context.drawLine(x1, y1, x2, y2);
};


/**
 * Draws a rectangle at a set of co-ordinates of a given width and height
 *
 * @param x is the x value where you want to start
 * @param y is the y value where you want to start
 * @param width is the width of the rectangle
 * @param height is the height of the rectangle
 */
Matrix.prototype.drawRect = function(x, y, width, height) {
    this.context.drawRect(x, y,  x + width - 1, y + height - 1);
};


/**
 * Draws a filled in rectangle at a set of co-ordinates of a given width and height
 * @param x is the x value where you want to start
 * @param y is the y value where you want to start
 * @param width is the width of the rectangle
 * @param height is the height of the rectangle
 */
Matrix.prototype.fillRect = function(x, y, width, height) {
    this.context.fillRect(x, y, x + width - 1, y + height - 1);
};


/**
 * Constructor for an Adafruit 8x8 LED Matrix Backpack.
 */
function Matrix8x8(options) {
    Matrix.call(this, options);
}

Matrix8x8.prototype = Object.create(Matrix.prototype);
Matrix8x8.prototype.constructor = Matrix;


/**
 * Writes an array of 8 8-bit values to the display graphics context
 * @param uint8array
 */
Matrix8x8.prototype.drawBitmap = function(uint8array){
    var array = [];
    uint8array.forEach(function(i){
        array.push(i);
        array.push(i);
    });
    this.context.buffer = new Uint8Array(array);
};


/**
 * Renders buffer/graphics context to the display.
 */
Matrix8x8.prototype.render = function() {
    I2C1.writeTo(this.address, 0,
       //Because of how the 8x8 Matrix is wired you need to rotate right by one bit
       (new Uint8Array(this.context.buffer)).map(this.rotate)
   );
};

module.exports.Matrix8x8 = Matrix8x8;


/**
 * Constructor for an Adafruit 16x8 LED Matrix Backpack.
 */
function Matrix16x8(options) {
    Matrix.call(this, options);
}

Matrix16x8.prototype = Object.create(Matrix.prototype);
Matrix16x8.prototype.constructor = Matrix;


/**
 * Writes an array of 16 8-bit values to the display graphics context
 *
 * The first two bytes of the array represent the first line and so on.
 * This: drawBitmap([0b00000000, 0b1111111, 0b00001111, 0b00110011, ...])
 * ends up like this in a 16x8 Matrix:
 *
 * 0000000011111111
 * 0000111100110011
 * ...
 *
 * @param uint8array
 */
Matrix16x8.prototype.drawBitmap = function(uint8array) {
    var array = [];
    uint8array.forEach(function(i){
        array.push(i);
    });
    this.context.buffer = new Uint8Array(array);
};

module.exports.Matrix16x8 = Matrix16x8;