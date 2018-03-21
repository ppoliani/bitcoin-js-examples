//const test = require('ava')
const {createBip32Address} = require('./bip32')

const mnemonic = 'excess stem kitten win couch chief usage yard load noodle attack spy';

// TODO: Add proper unit tests
console.log('Address 1: ', createBip32Address(mnemonic));
