'use strict'

const rp = require('request-promise-native')
const c = require('./constants.js')

const banks = c.BANK_ABBRS


/** calls the requested banks get products api with rp 
 * 
 * @param {String} bank requested bank
 * @param {String} xv 
 * @param {*} Optional optional arguments for each of the optional query paramaters
 * @return {Promise} on resolve returns the data from the api, or returns the error recieved
 */
async function callGetProductsApi(bank, xv) {
    if (bank === undefined) {
        throw new Error(`${c.MISSING_INPUT_ERROR_MSG}, ${bank}`)
    }
    if (xv === undefined) {
        throw new Error(`${c.MISSING_INPUT_ERROR_MSG}, ${xv}`)
    }
    if (!(banks.includes(bank))) {
        throw new Error(`${c.INCORRECT_INPUT_ERROR_MSG}, ${bank} is not supported`) // Throw an error if requested a bank that doesn't exist/isn't supported yet
    }
    let param = {}
    let qs = {}
    let xvmin = '' // Initiate xvmin as an empty string
    for (let i = 2; i < arguments.length; i++) {
        if (Object.keys(arguments[i])[0] === 'x-v-min') { // If the optional value is xvmin, assign it to xvmin
            xvmin = Object.values(arguments[i])[0]
        } else if (c.OPTIONAL_QUERY_PARAMATERS.includes(Object.keys(arguments[i])[0])) {
            param = `{"${Object.keys(arguments[i])[0]}": "${Object.values(arguments[i])[0]}"}` // Create the key value pair for the request
            param = JSON.parse(param)
            Object.assign(qs, param) // Assign the pair to the queries object 

        }
    }


    const prod_req_options = {
        url: `${c.BANK_ENDPOINTS[bank]}${c.PRODUCTS_SUFFIX}`, // Create the request 
        method: 'GET',
        headers: {
            'x-v': xv, // Mandetory 
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
                reject(error) // If unsucessful the promise is rejected with an error 
            });


    })

}


/**
 *  Returns all proudcts in an array for the specified bank
 * @param {String} bank the bank to return the products of 
 * @return {Array} returns the array of the products for the specified bank
 */
//see if this works as an  arguments array?
//its probably just 'get product array' - may not be neccesary...
async function getAllProducts(bank) {
    let productArray = new Array
    try {
        let bankProducts = await (callGetProductsApi(bank, 1, 1)) // uses the call bank api function to get the response
        productArray = bankProducts.data.products // Filters the response to just get the products array
        return productArray;
    } catch (error) {
        console.log(error)
    }

}

/** Gets and returns all the products of a specific category for a specified bank 
 * 
 * @param {String} bank reqquested bank
 * @param {number} categoryEnum requested category by number 
 * @return {Array} an array of all the products, or the supplied bank, which match the specified category 
 */


async function getProductCategory(bank, categoryEnum) {
    let categoryArray = new Array
    let category = Object.keys(c.PRODUCT_CATEGORIES).find(k => c.PRODUCT_CATEGORIES[k] === categoryEnum) // Finds the correct category from the passed enum index for values 
    try {
        let productArray = await getAllProducts(bank) // Uses the get all products function to get the products array
        productArray.forEach((product) => {
            if (product.productCategory === category) { // Fills a new array with only the responses that match the specified category
                categoryArray.push(product)
            }
        })
        return categoryArray;
    } catch (error) {
        console.log(error)
    }

}


module.exports = {
    callGetProductsApi,
    getAllProducts,
    getProductCategory
}