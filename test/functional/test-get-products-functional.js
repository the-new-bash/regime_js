/* eslint-disable no-undef */
"use strict";

const getProducts = require("../../lib/get-products");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;

let res;
// Tests the endpoints for valid responses

describe("functional tests for get products", () => {
  describe("functional tests for callGetProductsAPI() Function", () => {
    //CBA endpoint currently down
    it("should call and recieve a valid response from the CBA endpoint", async () => {
      res = await getProducts.callGetProductsAPI("CBA", 1);
      expect(res).to.be.an("object");
      expect(res).to.have.property("data");
      expect(res.data).to.have.property("products");
    });
    it("should call and recieve a valid response from the NAB endpoint", async () => {
      res = await getProducts.callGetProductsAPI("NAB", 1);
      expect(res).to.be.an("object");
      expect(res).to.have.property("data");
      expect(res.data).to.have.property("products");
    });
    it("should call and recieve a valid response from the ANZ endpoint", async () => {
      res = await getProducts.callGetProductsAPI("ANZ", 1, {
        "product-category": "TRANS_AND_SAVINGS_ACCOUNTS",
      });
      expect(res).to.be.an("object");
      expect(res).to.have.property("data");
      expect(res.data).to.have.property("products");
    });
    it("should call and recieve a valid response from the WBA endpoint", async () => {
      res = await getProducts.callGetProductsAPI("WBA", 1);
      expect(res).to.be.an("object");
      expect(res).to.have.property("data");
      expect(res.data).to.have.property("products");
    });
  });
});
