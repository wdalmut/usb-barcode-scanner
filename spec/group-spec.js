const ev = require('../ev');
const stream = require('stream');
const Scanner = require('../scanner');
const Group = require('../group');

const digit = require('./digit');

describe("Group", () => {
  it("should reply with the word", (done) => {
    let bufferStream = new stream.PassThrough();
    bufferStream.end("1234\n");

    bufferStream.pipe(new Group()).on('data', (data) => {
      expect(data).toEqual(Buffer.from("1234"));
      done();
    });
  });

  it("should remove a single escape sequence", (done) => {
    let ctrlC = Buffer.concat([
      digit(0x03),
      digit(0x1d),
      digit(0x2e),
      digit(0x1c),
    ]);

    let bufferStream = new stream.PassThrough();
    bufferStream.end(ctrlC);

    bufferStream.pipe(new Scanner()).pipe(new Group()).on('data', (data) => {
      expect(data).toEqual(Buffer.from("2"));
      done();
    });
  });

  it("should remove a multiple escape sequence", (done) => {
    let ctrlC = Buffer.concat([
      digit(0x03), //2
      digit(0x1d), //ctrl
      digit(0x2e), //c
      digit(0x1d), //ctrl
      digit(0x2e), //c
      digit(0x1d), //ctrl
      digit(0x2e), //c
      digit(0x1c), //\n
    ]);

    let bufferStream = new stream.PassThrough();
    bufferStream.end(ctrlC);

    bufferStream.pipe(new Scanner()).pipe(new Group()).on('data', (data) => {
      expect(data).toEqual(Buffer.from("2"));
      done();
    });
  });
});
