/*global qrcoder*/

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var imageObj = new Image();

imageObj.onload = function() {
  context.drawImage(imageObj, 0, 0);
};
imageObj.src = '/assets/image/lena.jpg';

function encode() {
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  imageData = qrcoder.encodeQR(imageData);
  context.putImageData(imageData, 0, 0);
}

function decode() {
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  imageData = qrcoder.decodeQR(imageData);
  context.putImageData(imageData, 0, 0);
}
