const axios = require('axios')

const instance  = axios.create({
    baseURL: "https://api.etherscan.io",
    timeout: 6000
});

module.exports = instance;