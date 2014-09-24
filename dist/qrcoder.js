/*jslint node: true */

var qrcoder = {};
var isNodeMode = false;

if (typeof module !== 'undefined') {
    isNodeMode = true;
}

if (isNodeMode === true) {
    qrcoder = module.exports = {};
    var qr = require('qr-js');
}

/**
 * Encode an image to QR code.
 * Base64 String, JPEG formated.
 *
 * @param {imageStr} image to be encoded
 * @return {qrStr} encoded image
 */

qrcoder.encodeQR = function(imageStr) {
    var qrStr = qr.image({
        size: 8,
        level: 'M',
        value: imageStr
    }).src;
    return qrStr;
};

/**
 * Decode an image from QR code.
 * Base64 String, JPEG formated.
 *
 * @param {qrStr} image to be decoded
 * @return {imageStr} decoded image
 */

qrcoder.decodeQR = function(qrStr) {
    // TODO
    // Write decoder here...
    var imageStr = qrStr;
    return imageStr;
};
