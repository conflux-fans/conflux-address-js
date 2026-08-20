# CHANGELOG

## v2.1.0

1. Fix issue: accepts base32 addresses containing characters CIP-37 removes from the alphabet

## v2.0.1

1. Change buffer to Uint8Array in `decode` to support browser environment. This is a break change!

## v1.3.5

1. Add four address checker `isZeroAddress`, `isInternalContractAddress`, `isValidHexAddress`, `isValidCfxHexAddress`
2. Use `conflux-address-rust` to boost address convert performance if in Node.js environment.
