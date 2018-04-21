# Barcode USB scanner stream

A NodeJs transform stream to convert a barcode (from an USB scanner) into a string representation.

```sh
npm --save usb-barcode-transform
```

## Example

```js
const fs = require('fs');
const Scanner = require('usb-barcode-transform');

const stream = fs.createReadStream("/dev/input/by-id/usb-USB_Adapter_USB_Device-event-kbd",{
  flags: 'r',
  encoding: null,
  fd: null,
  autoClose: true
});

stream.pipe(new Scanner()).pipe(process.stdout);
```

