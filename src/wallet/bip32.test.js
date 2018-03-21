//const test = require('ava')
const fn = require('../utils/fn')
const {createBip32Address} = require('./bip32')
const {createHDWallet} = require('./HDWallet')

const mnemonic = 'excess stem kitten win couch chief usage yard load noodle attack spy';
const wallet = createHDWallet(mnemonic);

// TODO: Add proper unit tests
console.log(`Address : m/44'/0'/0'/0/0`, createBip32Address(wallet, mnemonic));
console.log(`Address : m/44'/0'/0'/0/1`, createBip32Address(wallet, mnemonic));
console.log(`Address : m/44'/0'/0'/0/2`, createBip32Address(wallet, mnemonic));
console.log(`Address : m/44'/0'/0'/0/3`, createBip32Address(wallet, mnemonic));
console.log(`Address : m/44'/0'/0'/0/4`, createBip32Address(wallet, mnemonic));

