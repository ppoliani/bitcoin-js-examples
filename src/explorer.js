const {promisify} = require('util')
const Socket = require('blockchain.info/Socket')
const blockexplorer = require('blockchain.info/blockexplorer')
const {getMainnet, isMainnet, isTestnet} = require('./networks')

const getNetwork = network => {
  if(isMainnet(network)) return 0;
  if(isTestnet(network)) return 3;

  throw new Error('Network not available');
}

const getBlockexplorer = (network = getMainnet()) => blockexplorer.usingNetwork(getNetwork(network))
const getBlockChainSocket = (network = getMainnet()) => new Socket({network: getNetwork(network)});

const getUTXOs = async (address, network) => {
  const explorer = getBlockexplorer(network);
  const result = await explorer.getUTXOs(address);

  return result.unspent_outputs
}

const listenOnAddresses = (addresses, network) => {
  const socket = getBlockChainSocket(network);

  socket.onOpen(() => {
    console.log('Socker connection established');
  })
  
  const options = {
    addresses,
    setTxMini: true
  }
  
  // TODO: use a mostjs stream to push the data
  socket.onTransaction((data) => {
    console.log('Data Socket', data)
  }, options); 
}

const getValueFromUTXO = utxo => utxo.value;

module.exports = {
  getUTXOs,
  listenOnAddresses,
  getValueFromUTXO
}
