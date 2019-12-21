'use strict'

const c = require('./constants.js')

/**
 * Iterates through an array of objects and prints them to the console
 * @param {Array} arr array to be iterated through 
 */

const objPrinter = ((arr) => {
    arr.array.forEach(element => {
        console.log(element)
    });

})

module.exports = {
    objPrinter
}