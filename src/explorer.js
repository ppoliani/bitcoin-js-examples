const {promisify} = require('util')
const Socket = require('blockchain.info/Socket')
const blockexplorer = require('blockchain.info/blockexplorer')
const {getMainnet} = require('./networks')

const getBlockexplorer = (network = getMainnet()) => blockexplorer.usingNetwork(network)
const getBlockChainSocket = (network = getMainnet()) => new Socket({network: network});

const getUnspentOutputs = (address, network) => {
  const explorer = getBlockexplorer(network);
  return promisify(explorer.getUnspentOutputs)(address);
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

module.exports = {
  getUnspentOutputs,
  listenOnAddresses
}
