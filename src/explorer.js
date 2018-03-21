const Socket = require('blockchain.info/Socket')
const blockexplorer = require('blockchain.info/blockexplorer').usingNetwork(3)

const mySocket = new Socket({network: 5})
mySocket.onOpen(() => {
  console.log('Socker connection established');
})

const options = {
  addresses: ['2N7gUiky86zMZiLjVfB1Bhj4QeVLDeyJyvm'],
  setTxMini: true
}

blockexplorer.getUnspentOutputs('2N7gUiky86zMZiLjVfB1Bhj4QeVLDeyJyvm')
  .then((data) => {
    console.log('TXs', data)
  })

mySocket.onTransaction((data) => {
  console.log('Data Socket', data)
}, options);
