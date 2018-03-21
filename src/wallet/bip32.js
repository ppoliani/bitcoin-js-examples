const assert = require('assert')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')
const {increaseAddressIndex, getCurrentAddressIndex} = require('./addressDB')
const {importXpub} = require('./HDWallet')


const path = `m/44'/0'/0'/0`;
const generatePath = addressIndex => `${path}/${addressIndex}`

const getHDNode = (rootKey, addressIndex) => rootKey.derivePath(generatePath(addressIndex));
const getHDNodeAddress = hdNode =>  hdNode.getAddress();

const createBip32Address = (rootKey, addressIndex) => {
  const hdNode = getHDNode(rootKey, addressIndex);
  return generateSegwitAddress(hdNode.keyPair.getPublicKeyBuffer())
}

const generateSegwitAddress = pubKey => {
  const redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(bitcoin.crypto.hash160(pubKey))
  const scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
  
  return bitcoin.address.fromOutputScript(scriptPubKey)
}

// Check for details https://github.com/bitcoinjs/bitcoinjs-lib/issues/1006
const xpubToAddress = (xpub, addressIndex = 0, isChange = 0) => {
  if (xpub === undefined) throw new Error('Need xpub')

  const rootKey = importXpub(xpub);
  const txtPath = `${isChange}/${addressIndex}`;
  const child = rootKey.derivePath(txtPath);
  
  return generateSegwitAddress(child.keyPair.getPublicKeyBuffer());
}

module.exports = {
  createBip32Address,
  xpubToAddress
}
