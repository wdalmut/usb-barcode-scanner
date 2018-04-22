const stream = require('stream');
const Scanner = require('../scanner');

describe("Scanner", () => {
  let validInput64 = Buffer.from([
    0x00,0x00,0x00,0x00,
    0x00,0x00,0x00,0x00,
    0x00,0x00,0x00,0x00,
    0x00,0x00,0x00,0x00,
    0x00,0x00,
    0x08,0x00,
    0x01,0x00,0x00,0x00
  ]);

  let validInput32 = Buffer.from([
    0x00,0x00,0x00,0x00,
    0x00,0x00,0x00,0x00,
    0x00,0x00,
    0x08,0x00,
    0x01,0x00,0x00,0x00
  ]);

  it("should parse a key press on amd64", (done) => {
    let bufferStream = new stream.PassThrough();
    bufferStream.end(validInput64);

    bufferStream.pipe(new Scanner()).on('data', (data) => {
      expect(data).toEqual(Buffer.from([55]));
      done();
    });
  });

  it("should parse a key press on x86", (done) => {
    let bufferStream = new stream.PassThrough();
    bufferStream.end(validInput32);

    let scanner = new Scanner();
    scanner.arch = 32;

    bufferStream.pipe(scanner).on('data', (data) => {
      expect(data).toEqual(Buffer.from([55]));
      done();
    });
  });

  it("should parse a couple of keypresses on amd64", (done) => {
    let bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.concat([validInput64, validInput64]));

    bufferStream.pipe(new Scanner()).on('data', (data) => {
      expect(data).toEqual(Buffer.from([55, 55]));
      done();
    });
  });

  it("should parse a couple of keypresses on x86", (done) => {
    let bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.concat([validInput32, validInput32]));

    let scanner = new Scanner();
    scanner.arch = 32;

    bufferStream.pipe(scanner).on('data', (data) => {
      expect(data).toEqual(Buffer.from([55, 55]));
      done();
    });
  });
});
