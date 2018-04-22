const { Transform } = require('stream');

class GroupTransform extends Transform {
  constructor(options) {
    super(options);

    this.buffer = Buffer.alloc(0);
    this.removes = {
      0x00: 0,
      0x27: 0,
      0x08: 0,
      0x09: 0,
      0x17: 1,
      0x18: 1,
      0x19: 1,
      0x20: 1,
      0x21: 0,
    }
  }

  _parse(buffer) {
    let enter = buffer.indexOf('\n');

    if (enter === -1) {
      return [null, buffer];
    }

    let head = buffer.slice(0, enter);
    let tail = buffer.slice(enter+1);

    return [head, tail];
  }

  _strip(buffer) {
    let result = Buffer.alloc(0);

    for (let i=0; i<buffer.length; i++) {
      if (this.removes.hasOwnProperty(buffer[i])) {
        i += this.removes[buffer[i]];
      } else {
        result = Buffer.concat([result, buffer.slice(i, i+1)]);
      }
    }

    return result;
  }

  _transform(chunk, encoding, callback) {
    this.buffer = Buffer.concat([this.buffer, chunk]);

    let [head, tail] = this._parse(this.buffer);

    if (!head) {
      return callback(null);
    }

    this.buffer = tail;

    callback(null, this._strip(head));
  }
}

module.exports = GroupTransform;


