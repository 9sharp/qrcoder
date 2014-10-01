/*jslint node: true, mocha: true */

var assert = require("assert");
var fs = require('fs');
var qrcoder = require('../src/qrcoder.js');

var psnr = require('psnr');

var Canvas = require('canvas');

var testCases = [{
    src_path: __dirname + '/assets/lena-128.jpg',
    compress_path: __dirname + '/assets/lena_comp.jpg',
    qr_path: __dirname + '/assets/lena_qr.png',
    decode_path: __dirname + '/assets/lena_decode.png',
    quality: 10,
    psnr_thres: 20,
    bufsize: 8192,
    bit_limit: 23648, // For QR version 40 & Level L, bit_limit is 23648
}];

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

describe('General Test', function() {
    it('should expose a constructor', function() {
        assert(typeof qrcoder === 'object');
    });
});

describe('Functional Test', function() {
    this.timeout(10000);

    var test_case = testCases[0];
    var srcCanvas;
    var compCanvas;
    var qrCanvas;
    var decodeCanvas;
    var srcImage = new Canvas.Image();
    var compImage = new Canvas.Image();
    var qrImage = new Canvas.Image();
    var decodeImage = new Canvas.Image();

    it('should clean up old result as expected', function(done) {
        fs.unlinkSync(test_case.compress_path);
        fs.unlinkSync(test_case.qr_path);
        fs.unlinkSync(test_case.decode_path);
        assert(true);
        done();
    });

    it('should load image as expected', function() {
        fs.readFile(test_case.src_path, function(err, data) {
            if (err) {
                throw err;
            }
            srcImage.src = data;
            assert(true);
        });
    });

    it('should compress image as expected', function(done) {
        srcImage.onload = function() {
            var w = srcImage.width,
                h = srcImage.height;
            srcCanvas = new Canvas(w, h);
            srcCanvas.getContext('2d').drawImage(
                srcImage, 0, 0, w, h);
            var out = fs.createWriteStream(test_case.compress_path);
            var stream = srcCanvas.createJPEGStream({
                bufsize: test_case.bufsize,
                quality: test_case.quality,
                progressive: true
            });
            stream.pipe(out);
            assert(fs.existsSync(test_case.compress_path) === true);
            done();
        };
    });

    it('should load compressed image as expected', function(done) {
        compImage.onload = function() {
            var w = compImage.width,
                h = compImage.height;
            compCanvas = new Canvas(w, h);
            compCanvas.getContext('2d').drawImage(
                compImage, 0, 0, w, h);
            done();
        };

        fs.readFile(test_case.compress_path, function(err, data) {
            if (err) {
                throw err;
            }

            var str = "data:image/jpeg;base64," + data.toString('base64');
            compImage.src = str;
        });
    });

    it('should generate qr image as expected', function(done) {
        qrImage.onload = function() {
            var w = qrImage.width,
                h = qrImage.height;
            qrCanvas = new Canvas(w, h);
            qrCanvas.getContext('2d').drawImage(
                qrImage, 0, 0, w, h);
            var out = fs.createWriteStream(test_case.qr_path);
            var stream = qrCanvas.pngStream();
            stream.pipe(out);
            assert(fs.existsSync(test_case.qr_path) === true);
            done();
        };

        fs.readFile(test_case.compress_path, function(err, data) {
            if (err) {
                throw err;
            }

            var str = "data:image/jpeg;base64," + data.toString('base64');
            if (str.length * 8 > 23648) {
                console.log("String length is " + str.length + " is larger than 23648 bits...");
                assert(false);
            }
            var base64Data = qrcoder.encodeQR(str);

            qrImage.src = base64Data;
        });
    });

    it('should decode qr image as expected', function(done) {
        decodeImage.onload = function() {
            var w = decodeImage.width,
                h = decodeImage.height;
            decodeCanvas = new Canvas(w, h);
            decodeCanvas.getContext('2d').drawImage(
                decodeImage, 0, 0, w, h);
            decodeCanvas.toBuffer(function(err, buf){
                fs.writeFileSync(test_case.decode_path, buf);
                assert(fs.existsSync(test_case.decode_path) === true);
                done();
            });
        };

        qrcoder.decodeQR(test_case.qr_path,
            function(err, out) {
                if (err) {
                    throw err;
                }
                decodeImage.src = out;
            }
        );
    });

    it('should pass quality test, PSNR > ' + test_case.psnr_thres, function(done) {
        // Check PSNR
        var data_0 = srcCanvas.getContext('2d')
            .getImageData(0, 0, srcImage.width, srcImage.height).data;
        var data_1 = compCanvas.getContext('2d')
            .getImageData(0, 0, compImage.width, compImage.height).data;
        var data_2 = decodeCanvas.getContext('2d')
            .getImageData(0, 0, decodeImage.width, decodeImage.height).data;

        console.log('Src Image: ' + test_case.src_path);
        console.log('Compressed Image: ' + test_case.compress_path);
        console.log('Qrcode Image: ' + test_case.qr_path);
        console.log('Decode Image: ' + test_case.decode_path);

        var result_0 = psnr(data_0, data_1);
        console.log('\nCompressed PSNR between Src Image and Compressed Image:');
        if (result_0 === Infinity) {
            console.log('Results are identical');
        } else {
            console.log('PSNR is: ' + result_0);
        }

        var result_1 = psnr(data_1, data_2);
        console.log('\nQR encode PSNR between Compressed Image and Decode Image:');
        if (result_1 === Infinity) {
            console.log('Results are identical');
        } else {
            console.log('PSNR is: ' + result_1);
        }

        var result_2 = psnr(data_0, data_2);
        console.log('\nEnd-to-End PSNR between Src Image and Decode Image:');
        if (result_2 === Infinity) {
            console.log('Results are identical');
        } else {
            console.log('PSNR is: ' + result_2);
        }
        assert(result_2 > test_case.psnr_thres);
        done();
    });
});
