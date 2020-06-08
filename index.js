"use strict";

const getProducts = require("./lib/get-products.js");
const getProductDetails = require("./lib/get-product-details.js");

exports.callGetProductsAPI = getProducts.callGetProductsAPI;
exports.getProductsArray = getProducts.getProductsArray;
exports.callGetProductDetailsAPI = getProductDetails.getProductDetails;
