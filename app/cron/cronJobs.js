const cron = require('node-cron')
const isProduction = process.env.NODE_ENV === "production" ? true : false

let avaxGasHistory = require('./cronFunctions/History/gas_history_avax')

module.exports = function (io, cluster) {
    cron.schedule('*/30 * * * * *', () => { //START EVERYDAY AT 00:05
        avaxGasHistory.saveGasPriceAvax()
    })
}
