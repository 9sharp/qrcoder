/*jslint node: true */

var qrcoder = {};

if (typeof module !== 'undefined') {
	qrcoder = module.exports = {};
}

// ImageData ref: https://developer.mozilla.org/en-US/docs/Web/API/ImageData

/**
 * Encode an image to QR code.
 * Base64 String, JPEG formated.
 *
 * @param {ImageData} image to be encoded
 * @return {ImageData} encoded image
 */

qrcoder.encodeQR = function(imageData) {
	// TODO
	return imageData;
};

/**
 * Decode an image from QR code.
 * Base64 String, JPEG formated.
 *
 * @param {ImageData} image to be dncoded
 * @return {ImageData} decoded image
 */

qrcoder.decodeQR = function(imageData) {
	// TODO
	return imageData;
};
