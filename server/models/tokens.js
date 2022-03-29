const mongoose = require('mongoose')

const tokSchema = mongoose.Schema({
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
  
module.exports = mongoose.model('Tok', tokSchema);