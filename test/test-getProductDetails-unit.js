/* eslint-disable no-undef */
"use strict";

const getProductDetails = require("../lib/get-product-details.js");
const getProducts = require("../lib/get-products.js");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;

let res;

describe("unit tests for get product details function", () => {
  it("should return the details of the specified product ID", async () => {
    let arr = await getProducts.getProductsArray("ANZ", 1);
    let id = arr[0].productId;
    res = await getProductDetails.getProductDetails("ANZ", 1, id);
    expect(res).to.be.an("object");
    expect(res.data.productId).to.equal(id);
    expect(res).to.have.property("data");
  });
  it("should throw an error when not passed input arguments", async () => {
    return expect(
      getProductDetails.getProductDetails()
    ).to.eventually.be.rejectedWith(Error);
  });
  it("should throw an error when not passed an xv number", async () => {
    return expect(
      getProductDetails.getProductDetails("ANZ")
    ).to.eventually.be.rejectedWith(Error);
  });
  it("should throw an error when not passed a product id", async () => {
    return expect(
      getProductDetails.getProductDetails("ANZ", 1)
    ).to.eventually.be.rejectedWith(Error);
  });
  it("should throw an error when not passed a valid product id", async () => {
    return expect(
      getProductDetails.getProductDetails("ANZ", 1, 123)
    ).to.eventually.be.rejectedWith(Error);
  });
  it("should throw an error when passed an unsupported or invalid bank", async () => {
    return expect(
      getProductDetails.getProductDetails("notABank", 1)
    ).to.eventually.be.rejectedWith(Error);
  });
});
