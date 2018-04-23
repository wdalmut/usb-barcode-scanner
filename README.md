# Barcode USB scanner stream

[![Build Status](https://travis-ci.org/wdalmut/usb-barcode-scanner.svg?branch=master)](https://travis-ci.org/wdalmut/usb-barcode-scanner)

A NodeJs transform stream to convert a barcode (from an USB scanner) into a string representation.

```sh
npm --save usb-barcode-transform
```

## Scanner Example

```js
const fs = require('fs');
const Scanner = require('usb-barcode-transform/scanner');

const stream = fs.createReadStream("/dev/input/by-id/usb-USB_Adapter_USB_Device-event-kbd",{
  flags: 'r',
  encoding: null,
  fd: null,
  autoClose: true
});

stream
  .pipe(new Scanner())
  .pipe(process.stdout);
```

The scanner will send every single character as an ASCII character.

## Groupped Scanner Example

The `Group` stream will send a single event for each string representation
(1234567) identified by a newline `\n` char stripping out any escape character
(CTRL-C, ESC, etc).

```js
const fs = require('fs');
const barcode = require('usb-barcode-transform');

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
```

The `Group` send a single event that represent the decoded value (1234567)
without any escape sequence or carriage return `\n`.

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



