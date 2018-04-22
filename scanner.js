const ev = require('./keys');
const { Transform } = require('stream');

class BarcodeTransform extends Transform {
  constructor(options) {
    super(options);
    this.arch = (process.arch.indexOf('64') >= 0) ? 64 :32;
  }

  _parse(buf) {
    let offset = this.arch === 64 ? 16 : 8;

    let type = buf.readUInt16LE(offset);
    let code = ev.code[buf.readUInt16LE(offset + 2)];
    let value = buf.readInt32LE(offset + 4);

    if (value == ev.value.KEYPRESS) {
      return code;
    }
  }

  _transform(chunk, encoding, callback) {
    let size = (this.arch === 64 ? 24 : 16);

    let chars = [];
    for (let i=0; i<chunk.length; i+=size) {
      let scan = this._parse(chunk.slice(i, i+size));

      chars.push(scan);
    }

    callback(null, chars.filter((i) => i).join(''));
  }
}

module.exports = BarcodeTransform;

