const assert = require('assert')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')
const bip32utils = require('bip32-utils')

const path = `m/44'/0'/0'`;

const validateMnemonic = mnemonic => {
  assert.ok(bip39.validateMnemonic(mnemonic))
  return mnemonic;
}

const generateSeed = mnemonic => bip39.mnemonicToSeed(mnemonic)

const getHDRoot = seed => bitcoin.HDNode.fromSeedBuffer(seed)

const createHDRootKey = (getHDRoot) ['∘'] (generateSeed)

// Export the xpub for the node the given path
const exportXpub = rootKey => rootKey.derivePath(path).neutered().toBase58()

const importXpub = xpub => bitcoin.HDNode.fromBase58(xpub)

module.exports = {
  createHDRootKey: (createHDRootKey) ['∘'] (validateMnemonic),
  exportXpub,
  importXpub,
  path
}
