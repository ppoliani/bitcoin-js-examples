//const test = require('ava')
const {partial} = require('../utils/fn')
const {createBip32Address, xpubToAddress} = require('./bip32')
const {createHDRootKey, exportXpub} = require('./HDWallet')

const mnemonic = 'excess stem kitten win couch chief usage yard load noodle attack spy';

const printAddresses = (createAddress, addressIndex = 0) => {
  // TODO: Add proper unit tests
  console.log(`Address : m/44'/0'/0'/0/0`, createAddress(addressIndex++));
  console.log(`Address : m/44'/0'/0'/0/1`, createAddress(addressIndex++));
  console.log(`Address : m/44'/0'/0'/0/2`, createAddress(addressIndex++));
  console.log(`Address : m/44'/0'/0'/0/3`, createAddress(addressIndex++));
  console.log(`Address : m/44'/0'/0'/0/4`, createAddress(addressIndex++));

  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
}


const rootkey = createHDRootKey(mnemonic);
printAddresses(partial(createBip32Address, createHDRootKey(mnemonic)));

const xpub = exportXpub(rootkey);

console.log('xpub -------> ', xpub)

printAddresses(partial(xpubToAddress, xpub));
