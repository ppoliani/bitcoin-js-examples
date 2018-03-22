//const test = require('ava')
const {partial} = require('../utils/fn')
const bip39 = require('bip39')
const {createBip32Address, xpubToAddress, createMultisigFromXpub} = require('./bip32')
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

printAddresses(partial(createBip32Address, rootKeys[0]));

const xpubs = rootKeys.map(exportXpub)

console.log(' xpubs -------> ', xpubs)
console.log('=============================================================')

printAddresses(partial(xpubToAddress, xpubs[0]))

console.log('MultiSig addresses (3 of 5)')
console.log('=============================================================')

Array.from(new Array(3), (_, i) => {
  console.log(`MultiSig at address index ${i}: `, createMultisigFromXpub(2, 3, xpubs, i))
}) 

