const bip39 = require('bip39')
const {partial} = require('../utils/fn')
const {xpubToStandardAddress, createMultisigFromXpub, xpubToSegwitAddress} = require('./bip32')
const {createHDRootKey, exportXpub, generateSeed, path} = require('./HDWallet')

const printAddresses = (createAddress, addressIndex = 0) => {
  // TODO: Add proper unit tests
  console.log(`Address : ${path}/0/0`, createAddress(addressIndex++));
  console.log(`Address : ${path}/0/1`, createAddress(addressIndex++));
  console.log(`Address : ${path}/0/2`, createAddress(addressIndex++));
  console.log(`Address : ${path}/0/3`, createAddress(addressIndex++));
  console.log(`Address : ${path}/0/4`, createAddress(addressIndex++));

  console.log('=============================================================')
}

console.log(' Copay ')
console.log('=============================================================')

const copayXpubs = [
  'tpubDDLT5bPzYD3rAY3ShVGiKswCgAg3GrpUrNr3sNCEknac3JzfrjeYU1Xut2UTEP6VcMrYM8UoREJ7vaqRP428wdZje6x4H6A51toY4dZGEbc', // pavlos copay
  'tpubDDFGqanxg9gp6NRGEn4iBoCXH5CwbpvVCjTDF3YWTnW9rxqCmMFbfouBLWUtEhDLreXnwRwTcd4R6qyHeZkLqgx9bTPGnhpi3f7ufACoTku', // valerio copay
  'tpubDCLwsahXtpSd9B1Z472GGcpnZyfLtJwrqr9hwvhF5i7qP84qZNBioPWKPNNrM4Anb1QAkHpjrv65178Jx4BM1pxvaFP1nUPhVne3QdKNA9u' // pavlos mobile copay
];

printAddresses(partial(xpubToStandardAddress, copayXpubs[0]))
 

console.log('MultiSig addresses (2 of 3)')
console.log('=============================================================')

Array.from(new Array(10), (_, i) => {
  console.log(`MultiSig at address index ${i}: `, createMultisigFromXpub(2, 3, copayXpubs, i))
}) 
