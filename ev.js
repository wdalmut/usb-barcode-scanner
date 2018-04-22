const keys = {
  0: String.fromCharCode(0x00),
  1: "ESC",
  2: "1",
  3: "2",
  4: "3",
  5: "4",
  6: "5",
  7: "6",
  8: "7",
  9: "8",
  10: "9",
  11: "0",
  12: "-",
  13: "=",
  14: String.fromCharCode(0x08), // backspace
  15: String.fromCharCode(0x09), // tab
  16: "Q",
  17: "W",
  18: "E",
  19: "R",
  20: "T",
  21: "Y",
  22: "U",
  23: "I",
  24: "O",
  25: "P",
  26: "(",
  27: ")",
  28: "\n",
  29: String.fromCharCode(0x17), // left ctrl
  30: "A",
  31: "S",
  32: "D",
  33: "F",
  34: "G",
  35: "H",
  36: "J",
  37: "K",
  38: "L",
  39: ";",
  40: "'",
  41: "`",
  42: String.fromCharCode(0x18), // left shift
  43: "\\",
  44: "Z",
  45: "X",
  46: "C",
  47: "V",
  48: "B",
  49: "N",
  50: "M",
  51: ",",
  52: ".",
  53: "/",
  54: String.fromCharCode(0x19), // right shift
  55: "*",
  56: String.fromCharCode(0x20), // left alt
  57: " ",
}

module.exports = {
  value: {
    "RELEASE": 0,
    "KEYPRESS": 1,
  },
  toAscii: (code) => {
    if (!keys[code]) {
      return String.fromCharCode(0x21); // signals
    }

    return keys[code];
  },
}

