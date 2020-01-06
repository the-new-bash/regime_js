'use strict'

const c = require('./constants.js')



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
        let productArray = await getProductsArray(bank) // Uses the get all products function to get the products array
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

}