// TODO: this will actually use a real database
let addressIndex = 0;

const getCurrentAddressIndex = () => addressIndex

const increaseAddressIndex = () => {
  addressIndex = addressIndex + 1;
}

module.exports = {
  getCurrentAddressIndex,
  increaseAddressIndex
}
