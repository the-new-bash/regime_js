'use strict'

const rp = require('request-promise-native')
const c = require('./constants.js')

const banks = c.BANK_ABBRS

async function getProductDetails(bank, xv, productID, xminv) {
    if (bank === undefined) {
        throw new Error(`${c.MISSING_INPUT_ERROR_MSG}, bank is required`)
    }
    if (xv === undefined) {
        throw new Error(`${c.MISSING_INPUT_ERROR_MSG}, xv is required`)
    }
    if (!(banks.includes(bank))) {
        throw new Error(`${c.INCORRECT_INPUT_ERROR_MSG}, ${bank} is not supported`) // Throw an error if requested a bank that doesn't exist/isn't supported yet
    }
    if (productID === undefined) {
        throw new Error((`${c.MISSING_INPUT_ERROR_MSG}, ProductID is required`))
    }
    // If no xmin v is specificed make it equal to xv
    if (xminv === undefined) {
        xminv = xv
    }

    const prod_req_options = {
        url: `${c.BANK_HOLDERS[bank]}${c.CDS_AU}${c.PRODUCTS_SUFFIX}/${productID}`, // Create the request 
        method: 'GET',
        headers: {
            'x-v': xv, // Mandatory 
            'x-min-v': xminv // Optional
        },

        json: true // flag automatically stringifies the body to JSON

    }


    return new Promise((resolve, reject) => {

        rp(prod_req_options) // Calls the end point using the prod req object 
            .then(function (jsonBody) {
                resolve(jsonBody) // If successful returns the response in json
            })
            .catch(function (error) {
                reject(error) // If unsuccessful the promise is rejected with an error 
            });


    })



}


module.exports = {
    getProductDetails
}