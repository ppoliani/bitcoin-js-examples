const assert = require('assert')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')
const {pipe} = require('../utils/fn')
const {increaseAddressIndex, getCurrentAddressIndex} = require('./addressDB')

const path = `m/44'/0'/0'`;

const generatePath = addressIndex => `${path}/${addressIndex}`

const validateMnemonic = mnemonic => {
  assert.ok(bip39.validateMnemonic(mnemonic))
  return mnemonic;
}

const generateSeed = mnemonic => bip39.mnemonicToSeed(mnemonic)
const getHDRoot = seed => bitcoin.HDNode.fromSeedBuffer(seed)
const getHDNode = (hdRoot, addressIndex) => hdRoot.derivePath(generatePath(addressIndex));
const getHDNodeAddress = hdNode =>  hdNode.getAddress();

const createBip32Address = (mnemonic, path) => {
  const seed = generateSeed(mnemonic);
  const hdRoot = getHDRoot(seed);
  const hdNode = getHDNode(hdRoot, getCurrentAddressIndex());
  const address = getHDNodeAddress(hdNode);
  increaseAddressIndex();

  return address;
}

module.exports = {
  createBip32Address: (createBip32Address) ['∘'] (validateMnemonic)
}
