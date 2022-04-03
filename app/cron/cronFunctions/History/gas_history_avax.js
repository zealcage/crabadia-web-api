const moment = require("moment")
const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_URL))
let GasHistoryAvaxModel = require('../../../mongodbModel/gas_history.model');

async function getAvaxGasPrice() {
    try {
        const gas_price = await web3.eth.getGasPrice()
        return gas_price
    } catch (error) {
        console.log(error)
    }
}
exports.saveGasPriceAvax = async () => {
    try {
        let gas_price = null
        const tryCount = 0
        do {
            gas_price = await getAvaxGasPrice()
        } while (!gas_price && tryCount < 5);
        console.log("gas price: " + Number(gas_price) / 1000000000)
        GasHistoryAvaxModel.create({ price: gas_price })
    } catch (error) {
        console.log(error)
    }

}