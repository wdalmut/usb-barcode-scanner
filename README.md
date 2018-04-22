# Barcode USB scanner stream

A NodeJs transform stream to convert a barcode (from an USB scanner) into a string representation.

```sh
npm --save usb-barcode-transform
```

## Example

```js
const fs = require('fs');
const Scanner = require('usb-barcode-transform/scanner');

const stream = fs.createReadStream("/dev/input/by-id/usb-USB_Adapter_USB_Device-event-kbd",{
  flags: 'r',
  encoding: null,
  fd: null,
  autoClose: true
});

stream.pipe(new Scanner()).pipe(process.stdout);
```

## Basics

The [event struct](https://www.kernel.org/doc/Documentation/input/input.txt) in
the linux kernel have this interface

```c
struct input_event {
    struct timeval time;
    unsigned short type;
    unsigned short code;
    unsigned int value;
};
```

'time' is the timestamp, it returns the time at which the event happened.  Type
is for example EV\_REL for relative moment, EV\_KEY for a keypress or release.
More types are defined in include/uapi/linux/input-event-codes.h.

'code' is event code, for example REL\_X or KEY\_BACKSPACE, again a complete list
is in include/uapi/linux/input-event-codes.h.

'value' is the value the event carries. Either a relative change for EV\_REL,
absolute new value for EV\_ABS (joysticks ...), or 0 for EV\_KEY for release, 1
for keypress and 2 for autorepeat.



