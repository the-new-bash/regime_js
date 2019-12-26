'use strict'

const request = require('request')
const c = require('./constants.js')

const banks = c.BANK_ABBRS

/** calls the requested banks api
 * 
 * @param {String} bank requested bank
 * @param {String} xv 
 * @param {String} xvmin 
 * @return {Promise} on resolve returns the data from the api, or returns the error recieved
 */

async function callBankApi(bank, xv, xvmin) {
    if (!(banks.includes(bank))) {
        throw new Error(`${c.INCORRECT_INPUT_ERROR_MSG}, ${bank}`)
    }

    const prod_req = {
        url: `${c.BANK_ENDPOINTS[bank]}${c.PRODUCTS_SUFFIX}`,
        method: 'GET',
        headers: {
            'x-v': xv,
            'x-v-min': xvmin
        }
    };

    return new Promise((resolve, reject) => {
        try {
            request(prod_req, function (err, res, body) {
                let jsonRes = JSON.parse(body);
                resolve(jsonRes)
            })

        } catch (error) {
            reject(error)

        }
    })

}

// async function justProm(bool) {
//     return new Promise((resolve, reject) => {
//         if (bool) {

//             resolve("I resolved")
//         } else {
//             reject("I rejected")
//         }
//     })
// }

// async function testing() {
//     let tests = await justProm(true)
//     console.log(tests)
// }

/**
 *  Returns all proudcts in an array for the specified bank
 * @param {String} bank the bank to return the products of 
 * @return {Array} returns the array of the products for the specified bank
 */

async function getAllProducts(bank) {
    let productArray = new Array
    try {
        let bankProducts = await (callBankApi(bank, 1, 1))
        productArray = bankProducts.data.products
        console.log(typeof (productArray))
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
    console.log(typeof (categoryArray))
    let category = Object.keys(c.PRODUCT_CATEGORIES).find(k => c.PRODUCT_CATEGORIES[k] === categoryEnum) // Finds the correct category from the passed enum index for values 
    try {
        let productArray = await getAllProducts(bank)
        productArray.forEach((product) => {
            if (product.productCategory === category) {
                categoryArray.push(product)
            }
        })
        return categoryArray;
    } catch (error) {
        console.log(error)
    }

}

async function iReturn() {

    try {
        let prodArray = await getAllProducts('NAB')
        console.log(typeof (prodArray))
        const castArray = Object.keys(prodArray).map(i => prodArray[i])
        console.log(typeof (castArray))
        console.log(prodArray[0])

    } catch (error) {
        console.log(error)
    }

}

//iReturn()

//utils.objPrinter(anzProds.data.products)


module.exports = {
    callBankApi,
    getAllProducts,
    getProductCategory
}