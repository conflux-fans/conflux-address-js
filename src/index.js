const { encode, decode } = require('./cip37')
const CONST = require('./const')
const { isHexString } = require('./utils')

/**
 * Check whether a given address is valid, will return a boolean value
 *
 * @param address {string}
 * @return {boolean}
 *
 */
function isValidCfxAddress (address) {
  if (!isString(address)) {
    return false
  }
  try {
    decode(address)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Check whether a given address is valid, if not valid will throw an error
 *
 * @param address {string}
 *
 */
function verifyCfxAddress (address) {
  decode(address)
  return true
}

/**
 * Check conflux address's prefix
 *
 * @param address {string}
 * @return {boolean}
 *
 * @example
 */
function hasNetworkPrefix (address) {
  if (!isString(address)) {
    return false
  }
  const parts = address.toLowerCase().split(':')
  if (parts.length !== 2 && parts.length !== 3) {
    return false
  }
  const prefix = parts[0]
  if (prefix === CONST.PREFIX_CFX || prefix === CONST.PREFIX_CFXTEST) {
    return true
  }
  return (
    prefix.startsWith(CONST.PREFIX_NET) && /^([1-9]\d*)$/.test(prefix.slice(3))
  )
}

/**
 * simplify a verbose address(return a non-verbose address)
 *
 * @param address {string}
 * @return {string}
 *
 */
function simplifyCfxAddress (address) {
  if (!hasNetworkPrefix(address)) {
    throw new Error('invalid base32 address')
  }
  const parts = address.toLocaleLowerCase().split(':')
  if (parts.length !== 3) {
    return address
  }
  return `${parts[0]}:${parts[2]}`
}

function shortenCfxAddress (address, compress = false) {
  address = simplifyCfxAddress(address)
  const [netPre, body] = address.split(':')
  const tailLen = netPre === 'cfx' && !compress ? 8 : 4
  const pre = body.slice(0, 3)
  const tail = body.slice(body.length - tailLen)
  return `${netPre}:${pre}...${tail}`
}

function isString (data) {
  return typeof data === 'string'
}

function isZeroAddress (address) {
  if (!isHexString(address)) throw new Error('Only hex is allowed')
  return address === CONST.ZERO_ADDRESS_HEX
}

function isInternalContractAddress (address) {
  if (!isHexString(address)) throw new Error('Only hex is allowed')
  return (
    address === CONST.ADMIN_CONTROL ||
    address === CONST.SPONSOR_CONTROL ||
    address === CONST.STAKING ||
    address === CONST.CONFLUX_CONTEXT ||
    address === CONST.POS_REGISTER
  )
}

function isValidHexAddress (address) {
  return isHexString(address) && address.length === 42
}

// TOOD check address's checksum
function isValidCfxHexAddress (address) {
  if (address.length !== 42) return false
  if (isZeroAddress(address) || isInternalContractAddress(address)) return true
  return address.startsWith('0x1') || address.startsWith('0x8')
}

module.exports = {
  encode,
  decode,
  isValidCfxAddress,
  verifyCfxAddress,
  hasNetworkPrefix,
  simplifyCfxAddress,
  shortenCfxAddress,
  isZeroAddress,
  isInternalContractAddress,
  isValidHexAddress,
  isValidCfxHexAddress
}
