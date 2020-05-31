
const rp = require('request-promise-native');
const c = require('./constants.js');
const utils = require('./utils.js');


async function getProductDetails(bank, xv, productID, xminv) {
  utils.validateMandatoryInput.apply(null, arguments); // Validates the common mandatory inputs

  if (productID === undefined) {
    throw new Error((`${c.MISSING_INPUT_ERROR_MSG}, ProductID is required`));
  }
  // If no xmin v is specificed make it equal to xv
  if (xminv === undefined) {
    xminv = xv;
  }

  const prod_req_options = {
    url: `${c.BANK_HOLDERS[bank]}${c.CDS_AU}${c.PRODUCTS_SUFFIX}/${productID}`, // Create the request
    method: 'GET',
    headers: {
      'x-v': xv, // Mandatory
      'x-min-v': xminv, // Optional
    },

    json: true, // flag automatically stringifies the body to JSON

  };


  return new Promise((resolve, reject) => {
    rp(prod_req_options) // Calls the end point using the prod req object
      .then((jsonBody) => {
        resolve(jsonBody); // If successful returns the response in json
      })
      .catch((error) => {
        reject(error); // If unsuccessful the promise is rejected with an error
      });
  });
}


module.exports = {
  getProductDetails,
};
