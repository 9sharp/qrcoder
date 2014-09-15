/*jslint node: true */

var qrcoder = module.exports = {};

// ImageData ref: https://developer.mozilla.org/en-US/docs/Web/API/ImageData

// invert color. for development only.
function invImage(imageData) {
	var data = imageData.data;
	for (var i = 0; i < data.length; i += 4) {
		// red
		data[i] = 255 - data[i];
		// green
		data[i + 1] = 255 - data[i + 1];
		// blue
		data[i + 2] = 255 - data[i + 2];
		// alpha
		// No changes to alpha. Leave it here as document of imagedata.
		data[i + 3] = data[i + 3];
	}
	return imageData;
}

/**
 * Encode an image to QR code.
 *
 * @param {ImageData} image to be encoded
 * @return {ImageData} encoded image
 */

qrcoder.encodeQR = function(imageData) {
	return invImage(imageData);
};

/**
 * Decode an image from QR code.
 *
 * @param {ImageData} image to be dncoded
 * @return {ImageData} decoded image
 */

qrcoder.decodeQR = function(imageData) {
	return invImage(imageData);
};
