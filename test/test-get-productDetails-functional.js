/* eslint-disable no-undef */
"use strict";

const getProductDetails = require("../lib/get-product-details");
const getProducts = require("../lib/get-products");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;

let res;

// Tests the functionality of each banks endpoint

describe("functional tests for get product details function", () => {
  it("should return the details of the specified product ID for ANZ", async () => {
    let arr = await getProducts.getProductsArray("ANZ", 1);
    let id = arr[0].productId;
    res = await getProductDetails.getProductDetails("ANZ", 1, id);
    expect(res).to.be.an("object");
    expect(res.data.productId).to.equal(id);
    expect(res).to.have.property("data");
  });
  //Endpoint currently down
  it.skip("should return the details of the specified product ID for CBA", async () => {
    let arr = await getProducts.getProductsArray("CBA", 1);
    let id = arr[0].productId;
    res = await getProductDetails.getProductDetails("CBA", 1, id);
    expect(res).to.be.an("object");
    expect(res.data.productId).to.equal(id);
    expect(res).to.have.property("data");
  });
  it("should return the details of the specified product ID for NAB", async () => {
    let arr = await getProducts.getProductsArray("NAB", 1);
    let id = arr[0].productId;
    res = await getProductDetails.getProductDetails("NAB", 1, id);
    expect(res).to.be.an("object");
    expect(res.data.productId).to.equal(id);
    expect(res).to.have.property("data");
  });
  it("should return the details of the specified product ID for WBA", async () => {
    let arr = await getProducts.getProductsArray("WBA", 1);
    let id = arr[0].productId;
    res = await getProductDetails.getProductDetails("WBA", 1, id);
    expect(res).to.be.an("object");
    expect(res.data.productId).to.equal(id);
    expect(res).to.have.property("data");
  });
});
