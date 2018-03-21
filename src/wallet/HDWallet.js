const assert = require('assert')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

const validateMnemonic = mnemonic => {
  assert.ok(bip39.validateMnemonic(mnemonic))
  return mnemonic;
}

const generateSeed = mnemonic => bip39.mnemonicToSeed(mnemonic)

const getHDRoot = seed => bitcoin.HDNode.fromSeedBuffer(seed)

const createHDWallet = mnemonic => {
  const seed = generateSeed(mnemonic);
  
  return getHDRoot(seed);
}


module.exports = {
  createHDWallet: (createHDWallet) ['∘'] (validateMnemonic)
}
