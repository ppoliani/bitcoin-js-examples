const assert = require('assert')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')
const bip32utils = require('bip32-utils')

const validateMnemonic = mnemonic => {
  assert.ok(bip39.validateMnemonic(mnemonic))
  return mnemonic;
}

const generateSeed = mnemonic => bip39.mnemonicToSeed(mnemonic)

const getHDRoot = seed => bitcoin.HDNode.fromSeedBuffer(seed)

const createHDRootKey = mnemonic => {
  const seed = generateSeed(mnemonic);
  
  return getHDRoot(seed);
}

const createWalletFromXpub = () => {

}

const exportXpub = rootKey => rootKey.derivePath(`m/44'/0'/0'`).neutered().toBase58()

const importXpub = xpub => bitcoin.HDNode.fromBase58(xpub)

module.exports = {
  createHDRootKey: (createHDRootKey) ['∘'] (validateMnemonic),
  exportXpub,
  importXpub
}
