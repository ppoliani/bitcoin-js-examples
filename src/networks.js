const bitcoin = require('bitcoinjs-lib')

const getTestnet = () => bitcoin.networks.testnet
const getMainnet = () => bitcoin.networks.bitcoin
const getNetwork = () => getTestnet()

module.exports = {
  getNetwork,
  getMainnet,
  getTestnet
}
