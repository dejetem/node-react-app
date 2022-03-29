const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const balSchema = mongoose.Schema({
   status: { 
        type: Number,
        require: true 
    },
    message: { 
        type: String,
        require: true
    },
    result: {
      type: Number,
      require: true
    }
  });
  
module.exports = balSchema;