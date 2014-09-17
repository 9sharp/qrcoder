/*global qrcoder, jic*/

var srcCanvas = document.getElementById('srcCanvas');
var tarCanvas = document.getElementById('tarCanvas');
var srcImage = new Image();
var cmpImage = new Image();
var qrImage = new Image();
var tarImage = new Image();

cmpImage.onload = function() {
    qrImage.src = qrcoder.encodeQR(cmpImage.src);
};

tarImage.onload = function() {
    tarCanvas.getContext('2d').drawImage(tarImage, 0, 0, 512, 512);
};

srcImage.onload = function() {
    srcCanvas.getContext('2d').drawImage(srcImage, 0, 0);
    var quality = 20.0;
    cmpImage.src = srcCanvas.toDataURL('image/jpeg', quality/100);
};

srcImage.src = '/assets/image/lena.jpg';

function encode() {
    tarImage.src = qrImage.src;
}

function decode() {
    tarImage.src = qrcoder.decodeQR(qrImage.src);
}
