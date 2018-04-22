const barcode = require('./');

const fs = require('fs');

const stream = fs.createReadStream("/dev/input/by-id/usb-USB_Adapter_USB_Device-event-kbd",{
  flags: 'r',
  encoding: null,
  fd: null,
  autoClose: true
});

stream
  .pipe(new barcode.Scanner())
  .pipe(new barcode.Group())
  .pipe(process.stdout);
