'use strict'

const rp = require('request-promise-native')
const c = require('./constants.js')

const banks = c.BANK_ABBRS


/** calls the requested banks get products api using rp 
 * 
 * @param {String} bank requested bank
 * @param {Integer} xv api endpoint version number 
 * @param {*} Optional optional arguments for each of the optional query paramaters
 * @return {Promise} on resolve returns the data from the api, or returns the error recieved
 */
async function callGetProductsApi(bank, xv) {
    if (bank === undefined || bank === null) {
        throw new Error(`${c.MISSING_INPUT_ERROR_MSG}, ${bank}`)
    }
    if (xv === undefined || bank === null) {
        throw new Error(`${c.MISSING_INPUT_ERROR_MSG}, ${xv}`)
    }
    if (!(banks.includes(bank))) {
        throw new Error(`${c.INCORRECT_INPUT_ERROR_MSG}, ${bank} is not supported`) // Throw an error if requested a bank that doesn't exist/isn't supported yet
    }
    let param
    let qs = {}
    let xvmin = '' // Initiate xvmin as an empty string
    for (let i = 2; i < arguments.length; i++) {
        if (Object.keys(arguments[i])[0] === 'x-v-min') { // If the optional value is xvmin, assign it to xvmin
            xvmin = Object.values(arguments[i])[0]
        }
        else if (c.OPTIONAL_QUERY_PARAMATERS.includes(Object.keys(arguments[i])[0])) {
            param = `{"${Object.keys(arguments[i])[0]}": "${Object.values(arguments[i])[0]}"}` // Create the key value pair for the request
            param = JSON.parse(param) // Convert the string to an object 
            Object.assign(qs, param) // Assign the pair to the queries object 

        }
    }


    const prod_req_options = {
        url: `${c.BANK_HOLDERS[bank]}${c.CDS_AU}${c.PRODUCTS_SUFFIX}`, // Create the request 
        method: 'GET',
        headers: {
            'x-v': xv, // Mandatory 
            'x-v-min': xvmin // Optional
        },
        qs, // The queries opject, constructed from optional data 
        json: true // flag automatically stringifies the body to JSON

    };

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


/**
 *  Returns all proudcts in an array for the specified bank, function will call the endpoint multiple times if required to return a 
 *  single array containing all pages of data
 *  
 * @param {String} bank the bank to return the products of 
 * @param {Integer} xv the requested version 
 * @param {*} Optional optional arguments for each of the optional query paramaters
 * @return {Array} returns the array of all the products for the specified bank
 */
async function getProductsArray(bank, xv) {
    let productArray = new Array
    let pageNo = 1;
    let numPages;
    let params = arguments // All the Arguments supplied to this function must be passed through to make the api call
    const len = arguments.length++ // The page size argument must be injected into the object of params being passed to the api call

    do {
        try {
            let pagePos = JSON.parse(`{"${len}":{"page": ${pageNo}}}`) // creates the page number variable 
            Object.assign(params, pagePos) // Inserts the variable into the argument object, 
            let bankProducts = await (callGetProductsApi.apply(null, params)) // Calls the API using the supplied arguments and the params
            numPages = bankProducts.meta.totalPages // extracts the number of pages
            productArray = productArray.concat(bankProducts.data.products) // Filters the response to just get the products array and merges the new response with the return array
            pageNo++
        } catch (error) {
            console.log(error)
        }

    }
    while (pageNo <= numPages) // Loop concludes when the page number equals the last page number 
    return productArray;

}


module.exports = {
    callGetProductsApi,
    getProductsArray,
}