const bip39 = require('bip39')
const {partial} = require('../utils/fn')
const {getHDWalletBalance} = require('./bip32')
const {fromSatoshi} = require('../format')

const xpub = 'xpub6C813kyDeJvhogKEnRnArMuCEMcdfKnMsTnVfbRze3m6fcePPYPpnu3KAGLVXaej36MVFU3hgvHzSS2cHg191DSpMrZvcEi3SyAPfRWPrZW';

const showBalance = async () => {
  try {
    const balance = await getHDWalletBalance(xpub);
    console.log(`Tim's balance: ${fromSatoshi(balance)}`)
  }
  catch(err) {
    console.log('Error reading the balance ', err)
  }
}

showBalance();
