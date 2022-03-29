const express = require('express');
const router = express.Router();
const IndexController = require('../Controller/index')

router.get('/transac', IndexController.getTransactions)
router.get('/tran', IndexController.getAllTransac)
router.get('/latest', IndexController.getLatestTransac)

module.exports = router

                  