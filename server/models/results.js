const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var resultSchema = new Schema({
    blockNumber:{
        type: Number,
        require: true 
    },
    timeStamp:{
        type: Number,
        require: true 
    },
    hash:{
        type: String,
        require: true 
    },
    nonce:{
        type: Number
    },
    blockHash:{
        type: Number
    },
    transactionIndex:{
        type: Number,
        require: true 
    },
    from:{
        type: String,
        require: true 
    },
    to:{
        type: String,
        require: true 
    },
    value:{
        type: Number,
        require: true 
    },
    gas:{
        type: Number,
        require: true 
    },
    gasPrice:{
        type: Number,
        require: true 
    },
    isError:{
        type: Number,
        require: true 
    },
    txreceipt_status:{
        type: String,
    },
    input:{
        type: String,
    },
    contractAddress:{
        type: String
    },
    cumulativeGasUsed:{
        type: Number
    },
    gasUsed:{
        type: String
    },
    confirmations:{
        type: Number
    }
}
);

module.exports = resultSchema;