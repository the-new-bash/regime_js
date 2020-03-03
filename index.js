'use strict'

const getProducts = require('./lib/get-products.js')
const getProductDetails = require('./lib/get-product-details.js')

/** Calls the requested bank's api with the requested filters and returns the raw result
 * 
 * @param {String} bank Requested Bank
 * @param {Number} xv Requested Version No
 * @param {Object} [xvmin] optional - min version number
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
 * @param {Object} [xvmin] optional - min version number
 * @param {Object} [effective] optional - filtering param to set effective
 * @param {Object} [updatedSince] optional - filtering param to set updated since
 * @param {Object} [brand] optional - filtering param to select brand
 * @param {Object} [productCategory] optional - filtering param to select product category
 * @return {Array} the complete array or products for the selected bank and filters
 * 
 */
async function getAllProducts(bank, xv) {
    let productsArray
    try {
        productsArray = await getProducts.getProductsArray.apply(null, arguments)
    } catch (error) {
        console.log(error)
    }

    return productsArray

}

async function callGetProductDetailsApi(bank, xv, productID, xminv) {

    let res

    try {
        res = await getProductDetails.getProductDetails(bank, xv, productID, xminv)
    } catch (error) {
        console.log(error)
    }
    return res
}


module.exports = {
    getAllProducts,
    callGetProductsApi,
    callGetProductDetailsApi
}