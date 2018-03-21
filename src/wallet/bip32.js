const assert = require('assert')
const bip39 = require('bip39')
const {increaseAddressIndex, getCurrentAddressIndex} = require('./addressDB')
const {importXpub} = require('./HDWallet')


const path = `m/44'/0'/0'/0`;
const generatePath = addressIndex => `${path}/${addressIndex}`

const getHDNode = (rootKey, addressIndex) => rootKey.derivePath(generatePath(addressIndex));
const getHDNodeAddress = hdNode =>  hdNode.getAddress();

const createBip32Address = (rootKey, addressIndex) => {
  const hdNode = getHDNode(rootKey, addressIndex);
  const address = getHDNodeAddress(hdNode);

  return address;
}

// Check for details https://github.com/bitcoinjs/bitcoinjs-lib/issues/1006
const xpubToAddress = (xpub, addressIndex = 0, isChange = 0) => {
  if (xpub === undefined) throw new Error('Need xpub')

  const rootKey = importXpub(xpub);
  const txtPath = `${isChange}/${addressIndex}`;
  const child = rootKey.derivePath(txtPath);
  
  // Note: getAddress() only returns a non-segwit address that starts with a 1 (or m/n in testnet)
  // So to generate BIP49 addresses (P2WPKH-in-P2SH) you need to manually hash the public key
  // and generate the scripts to hash for the P2SH.
  return child.keyPair.getAddress();
} 

module.exports = {
  createBip32Address,
  xpubToAddress
}
