'use strict';

var oldNode = false;
var allocMax = 1048576;

var Buffer = buffer.Buffer;
var sharedBuffer = new Buffer(allocMax);
var allocLength = 0;

class BinaryWriter {
	
	constructor(){
		
		this.allocLength = 0;
		
	};
	
	writeUInt8(value) {
		sharedBuffer.writeUInt8(value, this.allocLength++, true);
	};

	writeUInt16(value) {
		sharedBuffer.writeUInt16LE(value, this.allocLength, true);
		this.allocLength += 2;
	};

	writeUInt32(value) {
		sharedBuffer.writeUInt32LE(value, this.allocLength, true);
		this.allocLength += 4;
	};

	writeFloat(value) {
		sharedBuffer.writeFloatLE(value, this.allocLength, true);
		this.allocLength += 4;
	};

	writeDouble(value) {
		sharedBuffer.writeDoubleLE(value, this.allocLength, true);
		this.allocLength += 8;
	};

	writeBytes(data) {
		data.copy(sharedBuffer, this.allocLength, 0, data.length);
		this.allocLength += data.length;
	};

	writeStringZeroUtf8(value) {
		var length = Buffer.byteLength(value, 'utf8');
		sharedBuffer.write(value, this.allocLength, 'utf8');
		this.allocLength += length;
		this.writeUInt8(0);
	};

	writeStringZeroUnicode(value) {
		var length = Buffer.byteLength(value, 'ucs2');
		sharedBuffer.write(value, this.allocLength, 'ucs2');
		this.allocLength += length;
		this.writeUInt16(0);
	};

	toBuffer() {
		var newBuf = oldNode ? new Buffer(this.allocLength) : Buffer.allocUnsafe(this.allocLength);
		sharedBuffer.copy(newBuf, 0, 0, this.allocLength);
		return newBuf;
	};
		
};

window.BinaryWriter = BinaryWriter;