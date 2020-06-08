"use strict";

const rp = require("request-promise-native");
const c = require("./constants.js");
const utils = require("./utils.js");

/** calls the requested banks get products api using rp
 *
 * @param {String} bank requested bank
 * @param {Integer} xv api endpoint version number
 * @param {*} Optional optional arguments for each of the optional query paramaters
 * @return {Promise} on resolve returns the data from the api, or returns the error recieved
 */
async function callGetProductsApi(bank, xv) {
  utils.validateMandatoryInput.apply(null, arguments); // Validates the common mandatory inputs

  // No matter how the options have been supplied, converts them to an array of options
  let options = convertOptionsToArray(arguments);

  let qs = {};
  let xminv = xv; // Initiate xvmin as XV

  options.forEach((option) => {
    if (Object.keys(option)[0] === "x-min-v") {
      // If the optional value is xvmin, assign it to xvmin
      xminv = Object.values(option)[0];
    } else if (c.OPTIONAL_QUERY_PARAMATERS.includes(Object.keys(option)[0])) {
      qs[Object.keys(option)[0]] = Object.values(option)[0]; // Create the key value pair for the request
    }
  });

  const prod_req_options = {
    url: `${c.BANK_HOLDERS[bank]}${c.CDS_AU}${c.PRODUCTS_SUFFIX}`, // Create the request
    method: "GET",
    headers: {
      "x-v": xv, // Mandatory
      "x-min-v": xminv, // Optional
    },
    qs, // The queries opject, constructed from optional data
    json: true, // flag automatically stringifies the body to JSON
  };

  return new Promise((resolve, reject) => {
    rp(prod_req_options) // Calls the end point using the prod req object
      .then(function (jsonBody) {
        resolve(jsonBody); // If successful returns the response in json
      })
      .catch(function (error) {
        reject(error); // If unsuccessful the promise is rejected with an error
      });
  });
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
  utils.validateMandatoryInput.apply(null, arguments); // Validates the common mandatory inputs
  for (let i = 0; i < arguments.length; i++) {
    if (
      Object.keys(arguments[i]).includes("page-size") ||
      Object.keys(arguments[i]).includes("page")
    ) {
      throw new Error(c.DO_NOT_APPLY_PAGINATON_ERROR_MSG);

      // the get products array function applies pagination, and should not be combined with custom pagination
    }
  }

  let productArray = new Array();
  let pageNo = 1;
  let numPages;
  let params = [];
  params.push(bank);
  params.push(xv);
  // All the Arguments supplied to this function must be passed through to make the api call
  let inputOptions = convertOptionsToArray(arguments);

  do {
    try {
      inputOptions.push({ page: pageNo }); // Creates the page number variable and inserts it into the params object
      params.push(inputOptions);
      let bankProducts = await callGetProductsApi.apply(null, params); // Calls the API using the supplied arguments and the params
      numPages = bankProducts.meta.totalPages; // extracts the number of pages
      productArray = productArray.concat(bankProducts.data.products); // Filters the response to just get the products array and merges the new response with the return array
      pageNo++;
    } catch (error) {
      console.log(error);
    }
  } while (pageNo <= numPages); // Loop concludes when the page number equals the last page number
  return productArray;
}

/** Takes an array of arguments, determines if options have been supplied individually or as an array
 * Either way, returns just an array of the options, removing the mandatory inputs from the start
 * This accounts for the standard "arguments" formatting
 * @param {Array} args
 * @return {Array}
 */

function convertOptionsToArray(args) {
  let options = [];
  if (Array.isArray(args[2])) {
    options = args[2];
  } else {
    for (let i = 2; i < args.length; i++) {
      options.push(args[i]);
    }
  }
  return options;
}

module.exports = {
  callGetProductsApi,
  getProductsArray,
  convertOptionsToArray,
};
