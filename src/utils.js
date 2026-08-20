
exports.isHexString = function (v) {
  return typeof v === 'string' && v.match(/^0x[0-9A-Fa-f]*$/)
}

exports.isString = function (data) {
  return typeof data === 'string'
}

// input should has no 0x prefix
exports.hexToBytes = function (hex) {
  const bytes = new Uint8Array(hex.length / 2)

  for (let c = 0; c < hex.length; c += 2) {
    bytes[c / 2] = parseInt(hex.substring(c, c + 2), 16)
  }

  return bytes
}

// output with no 0x prefix
exports.bytesToHex = function (uint8Array) {
  let hexString = ''
  for (let i = 0; i < uint8Array.length; i++) {
    let hex = uint8Array[i].toString(16)
    if (hex.length === 1) {
      hex = '0' + hex
    }
    hexString += hex
  }
  return hexString
}

// decode utf8 string to bytes
exports.decodeUTF8 = function (data) {
  const encoder = new TextEncoder()
  return encoder.encode(data)
}
