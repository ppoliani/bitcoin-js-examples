const bip39 = require('bip39')
const {increaseAddressIndex, getCurrentAddressIndex} = require('./addressDB')
const {createHDWallet} = require('./HDWallet')

const path = `m/44'/0'/0'/0`;
const generatePath = addressIndex => `${path}/${addressIndex}`

const getHDNode = (wallet, addressIndex) => wallet.derivePath(generatePath(addressIndex));
const getHDNodeAddress = hdNode =>  hdNode.getAddress();

const createBip32Address = (wallet, path) => {
  const hdNode = getHDNode(wallet, getCurrentAddressIndex());
  const address = getHDNodeAddress(hdNode);
  increaseAddressIndex();

  return address;
}

module.exports = {
  createBip32Address
}
