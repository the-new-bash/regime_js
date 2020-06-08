/* eslint-disable no-undef */
"use strict";

const getProductDetails = require("../../lib/get-product-details");
const getProducts = require("../../lib/get-products");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;

let res;

// Tests the functionality of each banks endpoint
let ANZId;
let CBAId;
let NABId;
let WBAId;
before(async () => {
  let ANZarr = await getProducts.getProductsArray("ANZ", 1);
  ANZId = ANZarr[0].productId;
  let CBAarr = await getProducts.getProductsArray("CBA", 1);
  CBAId = CBAarr[0].productId;
  let NABArr = await getProducts.getProductsArray("NAB", 1);
  NABId = NABArr[0].productId;
  let WBAarr = await getProducts.getProductsArray("WBA", 1);
  WBAId = WBAarr[0].productId;
});

describe("functional tests for get product details function", () => {
  it("should return the details of the specified product ID for ANZ", async () => {
    res = await getProductDetails.getProductDetails("ANZ", 1, ANZId);
    expect(res).to.be.an("object");
    expect(res.data.productId).to.equal(ANZId);
    expect(res).to.have.property("data");
  });

  it("should return the details of the specified product ID for CBA", async () => {
    res = await getProductDetails.getProductDetails("CBA", 1, CBAId);
    expect(res).to.be.an("object");
    expect(res.data.productId).to.equal(CBAId);
    expect(res).to.have.property("data");
  });
  it("should return the details of the specified product ID for NAB", async () => {
    res = await getProductDetails.getProductDetails("NAB", 1, NABId);
    expect(res).to.be.an("object");
    expect(res.data.productId).to.equal(NABId);
    expect(res).to.have.property("data");
  });
  it("should return the details of the specified product ID for WBA", async () => {
    res = await getProductDetails.getProductDetails("WBA", 1, WBAId);
    expect(res).to.be.an("object");
    expect(res.data.productId).to.equal(WBAId);
    expect(res).to.have.property("data");
  });
});
