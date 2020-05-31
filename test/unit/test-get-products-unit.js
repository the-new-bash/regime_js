/* eslint-disable no-undef */
"use strict";

const getProducts = require("../../lib/get-products");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;

let res;

describe("unit tests for get products", () => {
  describe("unit tests for callGetProductsApi() Function", () => {
    it("should throw an error when passed a bank that is not supported", async () => {
      return expect(
        getProducts.callGetProductsApi("notABank", 1)
      ).to.eventually.be.rejectedWith(Error);
    });

    it("should throw an error when not passed a paramater for xv", async () => {
      return expect(
        getProducts.callGetProductsApi("ANZ")
      ).to.eventually.be.rejectedWith(Error);
    });
    it("should throw an error when not passed an argument for bank", async () => {
      return expect(
        getProducts.callGetProductsApi(null, 1)
      ).to.eventually.be.rejectedWith(Error);
    });
    it("should accept and optional paramaters and return an appropriate response", async () => {
      let fullRes = await getProducts.callGetProductsApi("ANZ", 1);
      res = await getProducts.callGetProductsApi("ANZ", 1, {
        "product-category": "TRANS_AND_SAVINGS_ACCOUNTS",
      });
      expect(res).to.be.an("object");
      expect(res).to.have.property("data");
      expect(res.data).to.have.property("products");
      expect(res).to.not.equal(fullRes);
    });
  });
  describe("unit tests for getProductsArray() Function", () => {
    it("should return only an array", async () => {
      let fullRes = await getProducts.callGetProductsApi("ANZ", 1);
      let len = fullRes.meta.totalRecords;
      res = await getProducts.getProductsArray("ANZ", 1);
      expect(Array.isArray(res));
      expect(res.length).to.equal(len); // Check that the array contains the total number of products
    });
    it("should throw an error if passed incorrect input", async () => {
      return expect(
        getProducts.getProductsArray("ANZ")
      ).to.eventually.be.rejectedWith(Error);
    });
    it("should throw an error when passed a value for pagination", async () => {
      return expect(
        getProducts.getProductsArray("ANZ")
      ).to.eventually.be.rejectedWith(Error);
    });
  });
  describe("unit tests for convert to options array() function", () => {
    const argArray = [
      ["Arguments"],
      { "0": "ANZ", "1": 1 },
      [
        { parameter1: "value" },
        { parameter2: "value" },
        { parameter3: "value" },
      ],
    ];
    const argIndividual = [
      ["Arguments"],
      { "0": "ANZ", "1": 1 },
      { parameter1: "value" },
      { parameter2: "value" },
      { parameter3: "value" },
    ];

    const outputArr = [
      { parameter1: "value" },
      { parameter2: "value" },
      { parameter3: "value" },
    ];
    it("should return an array of arguments, excluding the first two when passed an arguments object, with an array as the third element", () => {
      expect(getProducts.convertOptionsToArray(argArray)).to.deep.equal(
        outputArr
      );
    });
    it("should return an array of arguments when passed an arguments object with the optional arugments listed individaully", () => {
      expect(getProducts.convertOptionsToArray(argIndividual)).to.deep.equal(
        outputArr
      );
    });
  });
});
