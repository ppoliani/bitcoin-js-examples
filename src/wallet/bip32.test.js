//const test = require('ava')
const {partial} = require('../utils/fn')
const bip39 = require('bip39')
const {
  generateStandardAddress, 
  generateSegwitAddress, 
  xpubToStandardAddress, 
  xpubToSegwitAddress, 
  createMultisigFromXpub
} = require('./bip32')
const {createHDRootKey, exportXpub, generateSeed} = require('./HDWallet')

const mnemonics = [
  'nephew surface exist stool into grief flush garden matrix squirrel split strategy',
  'sword moon must hair guess oblige car unfold media defy pen spoil',
  'inch enable title pepper already orbit tissue field edit dynamic chaos bright'
];

const rootKeys = mnemonics.map(createHDRootKey);

console.log(' rootKeys -------> ')
rootKeys.forEach(rootKey => console.log(rootKey.keyPair.d.toHex()))
console.log('=============================================================')

const printAddresses = (createAddress, addressIndex = 0) => {
  // TODO: Add proper unit tests
  console.log(`Address : m/44'/0'/0'/0/0`, createAddress(addressIndex++));
  console.log(`Address : m/44'/0'/0'/0/1`, createAddress(addressIndex++));
  console.log(`Address : m/44'/0'/0'/0/2`, createAddress(addressIndex++));
  console.log(`Address : m/44'/0'/0'/0/3`, createAddress(addressIndex++));
  console.log(`Address : m/44'/0'/0'/0/4`, createAddress(addressIndex++));

  console.log('=============================================================')
}

printAddresses(partial(generateStandardAddress, rootKeys[0]));

const xpubs = rootKeys.map(exportXpub)

console.log(' xpubs -------> ', xpubs)
console.log('=============================================================')

printAddresses(partial(xpubToStandardAddress, xpubs[0]))

console.log('MultiSig addresses (2 of 3)')
console.log('=============================================================')

Array.from(new Array(3), (_, i) => {
  console.log(`MultiSig at address index ${i}: `, createMultisigFromXpub(2, 3, xpubs, i))
}) 


console.log(' Copay ')
console.log('=============================================================')

const copayXpubs = [
  'tpubDC3o7sY87orQ39Mts3tg4fbkkdPrsYAEHy1MJoSgSjikig5eLi5Ya9PAGBbvRQwpDwdM2p21k1adJqiJP5suMif6p8siZdbgfozrM83jsLx', // pavlos copay
  'tpubDCeD8FipT7fFVswwiGVwJUb3Ahkagd3ZCxQVoQsB9GyXMLn5izCbNqtUynGGQwzZhhQUeKWuWLLfDV749SPdE2Y5qGfw6H2eVoALV3eErTu', // valerio copay
  'tpubDCLwsahXtpSd9B1Z472GGcpnZyfLtJwrqr9hwvhF5i7qP84qZNBioPWKPNNrM4Anb1QAkHpjrv65178Jx4BM1pxvaFP1nUPhVne3QdKNA9u' // pavlos mobile copay
];

printAddresses(partial(xpubToStandardAddress, copayXpubs[0]))

console.log('MultiSig addresses (2 of 3)')
console.log('=============================================================')

Array.from(new Array(3), (_, i) => {
  console.log(`MultiSig at address index ${i}: `, createMultisigFromXpub(2, 3, copayXpubs, i))
}) 
