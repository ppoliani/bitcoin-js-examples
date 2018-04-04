const assert = require('assert')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')
const sortBy = require('lodash.sortby')
const {getNetwork} = require('../networks')
const {increaseAddressIndex, getCurrentAddressIndex} = require('./addressDB')
const {importXpub} = require('./HDWallet')
const {getPath} = require('../constants')
const {getUTXOs, getValueFromUTXO} = require('../explorer')

const generatePath = (addressIndex = 0, isChange = 0) => `${getPath()}/${isChange}/${addressIndex}`
const getHDNode = (rootKey, addressIndex, isChange) => rootKey.derivePath(generatePath(addressIndex, isChange));
const getHDNodeAddress = hdNode =>  hdNode.getAddress();

const getAddress = hdNode => hdNode.getAddress()

const generateStandardAddress = (rootKey, addressIndex = 0, isChange = 0) => {
  const hdNode = getHDNode(rootKey, addressIndex, isChange);
  return getAddress(hdNode);
}

const generateSegwitAddress = hdNode => {
  const pubKey = hdNode.keyPair.getPublicKeyBuffer()
  const redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(bitcoin.crypto.hash160(pubKey))
  const scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
  
  return bitcoin.address.fromOutputScript(scriptPubKey, getNetwork());
}

const getMultisigPubKeys = (m, n, xpubs, addressIndex = 0, isChange = 0) => {
  if (xpubs.length !== n) throw new Error('Missing keys')

  const rootKeys = xpubs.map(importXpub);
  const txtPath = `${isChange}/${addressIndex}`;

  const publicKeys = rootKeys
    .map(rootKey => rootKey.derivePath(txtPath))
    .map(derivedKey => derivedKey.keyPair.getPublicKeyBuffer());

  const sorted = sortBy(publicKeys, key => key.toString('hex'));

  return sorted;
}

const createMultisigSegwitFromXpub = (m, n, xpubs, addressIndex = 0, isChange = 0) => {
  const pubKeys = getMultisigPubKeys(m, n, xpubs, addressIndex, isChange);
  const witnessScript = bitcoin.script.multisig.output.encode(m, pubKeys);
  const redeemScript = bitcoin.script.witnessScriptHash.output.encode(bitcoin.crypto.sha256(witnessScript))
  const scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
  

  return bitcoin.address.fromOutputScript(scriptPubKey, getNetwork())
}

const createMultisigFromXpub = (m, n, xpubs, addressIndex = 0, isChange = 0) => {
  const pubKeys = getMultisigPubKeys(m, n, xpubs, addressIndex, isChange);

  const redeemScript = bitcoin.script.multisig.output.encode(m, pubKeys);
  const scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript));
  
  return bitcoin.address.fromOutputScript(scriptPubKey, getNetwork());
}

const getHDNodeFromXpub = (xpub, addressIndex = 0, isChange = 0) => {
  if (xpub === undefined) throw new Error('Need xpub')

  const rootKey = importXpub(xpub);
  const txtPath = `${isChange}/${addressIndex}`;
  
  return rootKey.derivePath(txtPath);
}

// Check for details https://github.com/bitcoinjs/bitcoinjs-lib/issues/1006
const xpubToStandardAddress = (xpub, addressIndex = 0, isChange = 0) =>  {
  const hdNode = getHDNodeFromXpub(xpub, addressIndex, isChange);
  return getAddress(hdNode);
}

const xpubToSegwitAddress = (xpub, addressIndex = 0, isChange = 0) => {
  const child = getHDNodeFromXpub(xpub, addressIndex, isChange);

  return generateSegwitAddress(child);
}

const getAddressBalance = async address => {
  const UTXOs = await getUTXOs(address);
  return UTXOs.reduce((sum, utxo) => sum + getValueFromUTXO(utxo), 0);
}


const getHDWalletBalance = async xpub => {
  let addressIndex = 0;
  const address = xpubToSegwitAddress(xpub, addressIndex);
  const balance = await getAddressBalance(address);

  // create a segwit and legacy address for each index

  return balance;
}

module.exports = {
  getHDWalletBalance,
  generateStandardAddress,
  generateSegwitAddress,
  xpubToStandardAddress,
  xpubToSegwitAddress,
  createMultisigSegwitFromXpub,
  createMultisigFromXpub
}
