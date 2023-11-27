# CHANGELOG

## v1.4.0

1. Change buffer to Uint8Array in `decode` to support browser environment. This is a break change!

## v1.3.5

1. Add four address checker `isZeroAddress`, `isInternalContractAddress`, `isValidHexAddress`, `isValidCfxHexAddress`
2. Use `conflux-address-rust` to boost address convert performance if in Node.js environment.
