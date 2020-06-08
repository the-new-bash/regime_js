"use strict";

const getProducts = require("./lib/get-products.js");
const getProductDetails = require("./lib/get-product-details.js");

exports.callGetProductsApi = getProducts.callGetProductsApi;
exports.getProductsArray = getProducts.getProductsArray;
exports.callGetProductDetailsApi = getProductDetails.getProductDetails;
