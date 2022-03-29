const mongoose = require('mongoose');
const balSchema = require('./balance');
const resultSchema = require('./results');
const Schema = mongoose.Schema;

const transacSchema = mongoose.Schema({
    status: { 
        type: Number,
        require: true 
    },
    message: { 
        type: String,
        require: true
    },
    result: [resultSchema],
    bal: [balSchema]
  });
  
module.exports = mongoose.model('Transac', transacSchema);