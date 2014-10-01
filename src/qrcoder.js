/*jslint node: true */

var qrcoder = {};
var isNodeMode = false;

if (typeof module !== 'undefined') {
    isNodeMode = true;
}

if (isNodeMode === true) {
    module.exports = qrcoder;
    var qr = require('qr-encode');
    var qrdecoder = require('node-zxing')({});
}

/**
 * Encode an image to QR code.
 * Base64 String, JPEG formated.
 *
 * @param {imageStr} image to be encoded
 * @return {qrStr} encoded image
 */

qrcoder.encodeQR = function(imageStr) {
    var qrStr = qr(imageStr, {
            type: 40,
            size: 4,
            level: 'L'
        });
    return qrStr;
};

/**
 * Decode an image from QR code.
 * Base64 String, JPEG formated.
 *
 * @param {path} image path to be decoded
 * @param {callback}
 */

qrcoder.decodeQR = function(path, callback) {
    qrdecoder.decode(path, callback);
};
