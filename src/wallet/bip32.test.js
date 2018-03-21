//const test = require('ava')
const {partial} = require('../utils/fn')
const {createBip32Address, xpubToAddress, createMultisigFromXpub} = require('./bip32')
const {createHDRootKey, exportXpub} = require('./HDWallet')

const mnemonics = [
  'excess stem kitten win couch chief usage yard load noodle attack spy',
  'embark remember issue dad magnet beyond address ice edit artwork control amount',
  'rack seven design spot erupt scan glass coconut update toe twice rally',
  'drip ostrich flash hard sample public sorry powder name hammer chef slice',
  'bulk wonder leaf license equal gold slam merge unable used safe ranch'
];

const rootKeys = mnemonics.map(createHDRootKey);

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

const xpubs = rootKeys.map(exportXpub);

console.log(' xpub -------> ', xpubs[0])
console.log('=============================================================')

printAddresses(partial(xpubToAddress, xpubs[0]));

console.log('MultiSig addresses (3 of 5)')
console.log('=============================================================')

Array.from(new Array(5), (_, i) => {
  console.log(`MultiSig at address index ${i}: `, createMultisigFromXpub(3, 5, xpubs, i))
}) 

