const bitcoin = require('bitcoinjs-lib')

const getTestnet = () => bitcoin.networks.testnet
const getMainnet = () => bitcoin.networks.bitcoin
const getNetwork = () => process.env.NETWORK === 'mainnet' ? getMainnet() : getTestnet();

const isMainnet = network => network === bitcoin.networks.bitcoin;
const isTestnet = network => network === bitcoin.networks.bitcoin;

module.exports = {
  getNetwork,
  getMainnet,
  getTestnet,
  isMainnet,
  isTestnet
}
