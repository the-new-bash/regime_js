'use strict'

const getProducts = require('./lib/get-products.js')
const c = require('./lib/constants.js')

/** Calls the requested bank's api with the requested filters and returns the raw result
 * 
 * @param {String} bank Requested Bank
 * @param {Number} xv Requested Version No
 * @param {Objext} [xvmin] optional - min version number
 * @param {Object} [effective] optional - filtering param to set effective 
 * @param {Object} [updatedSince] optional - filtering param to set updated since
 * @param {Object} [brand] optional - filtering param to select brand
 * @param {Object} [productCategory] optional - filtering param to select product category
 * @param {Object} [page] optional - filtering param to select page
 * @param {Object} [pageSize] optional - filtering param for page size
 * @return {Object} The raw result of hitting the bank's end point 
 */


async function callGetProductsApi(bank, xv) {
    let res

    try {
        res = getProducts.callGetProductsApi.apply(null, arguments)

    } catch (error) {
        console.log(error)
    }

    return res
}


/** Function returns all products for specified bank, applying pagination 
 * 
 * @param {String} bank the specified bank
 * @param {Number} xv the version number
 * @return {Array} the complete array or products for the selected bank and filters
 * 
 */
async function getAllProducts(bank, xv) {
    for (let i = 0; i < arguments.length; i++) {
        if (Object.keys(arguments[i]).includes('page-size') || Object.keys(arguments[i]).includes('page')) {
            throw new Error(c.DO_NOT_APPLY_PAGINATON_ERROR_MSG)
            // the get products array function applies pagination, and should not be combined with custom pagination
        }
    }

    let productsArray
    try {
        productsArray = await getProducts.getProductsArray.apply(null, arguments)
    } catch (error) {
        console.log(error)
    }

    return productsArray

}

async function call() {
    let res
    try {
        res = await callGetProductsApi('ANZ', 1, { "product-category": "TRANS_AND_SAVINGS_ACCOUNTS" }, { "page-size": 5 })

    } catch (error) {
        console.log(error)

    }
    console.log(res)

}
call()

//console.log(c.PRODUCT_CATEGORIES)


module.exports = {
    getAllProducts,
    callGetProductsApi
}