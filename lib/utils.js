"use strict";

const c = require("./constants");

const banks = c.BIG4_BANK_ABBRS;

/** Takes the arguments passed to a function and checks for the common mandetory arguments
 *
 * @param {*} args The arguments passed to the function
 */

function validateMandatoryInput() {
  const bank = arguments[0];
  console.log(bank)
  const xv = arguments[1];

  if (bank === undefined) {
    throw new Error(`${c.MISSING_INPUT_ERROR_MSG}, bank is required`);
  }
  if (xv === undefined) {
    throw new Error(`${c.MISSING_INPUT_ERROR_MSG}, xv is required`);
  }
  if (!banks.includes(bank)) {
    throw new Error(`${c.INCORRECT_INPUT_ERROR_MSG}, ${bank} is not supported`); // Throw an error if requested a bank that doesn't exist/isn't supported yet
  }
  return;
}

module.exports = {
  validateMandatoryInput,
};
