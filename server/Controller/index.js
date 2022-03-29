const axios = require('axios')
const Bal = require('../models/balance')
const Tok = require('../models/tokens')
const Transac = require('../models/transactions')
const dotenv = require('dotenv').config()




class App{
    getTransactions = async (req,res) => {
        const params = {
           address: req.query.search,
           apikey:process.env.API_KEY
        }

        const url_transac = `https://api.etherscan.io/api?module=account&action=txlist&address=${encodeURIComponent(params.address)}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${encodeURIComponent(params.apikey)}`

        const url_bal = `https://api.etherscan.io/api?module=account&action=balance&address=${encodeURIComponent(params.address)}&tag=latest&apikey=${encodeURIComponent(params.apikey)}`

        const requestOne = axios.get(url_transac);
        const requestTwo = axios.get(url_bal);
        try{
            async function transactions(){
                axios.all([requestOne, requestTwo])
                .then(axios.spread((...response) => {
                    const resultData = response[0].data
                    const resultData2 = response[1].data
                    console.log(resultData)
                    console.log(resultData2)
                    const transac = new Transac({
                        status:resultData.status,
                        message:resultData.message,
                        result:resultData.result,
                        bal:resultData2
                   });
                    transac.save().then(
                       () => {
                          res.json({
                           message: 'saved successfully! to db',
                           transac
                          });
                        }
                    ).catch(
                       (error) => {
                           res.json({
                               error: error
                            });
                        }
                    );
                }))
                .catch(error => {
                   console.error('There was an error!', error);
                });
            }
            transactions()
        }
        catch(error) {
           res.status().json({ message: err.message })
        }
    }

    getAllTransac = async (req , res ) => {
        try{
           const transac = await Transac.find().sort({timeStamp: -1}) 

           res.json({
               message: 'Data successfully! received',
               transac
            })
        }catch(error) {
           res.status().json({ message: err.message })
        }
    }

    getLatestTransac = async (req , res ) => {
        try{
           const transac = await Transac.find().sort({_id:-1}).limit(1);
           res.json({
               message: 'Data successfully! received',
               transac
            })
        }catch(error) {
           res.status().json({ message: err.message })
        }
   }
}

const crawlerApp = new App()
module.exports = crawlerApp