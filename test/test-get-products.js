/* eslint-disable no-undef */
'use strict'

const getProducts = require('../lib/get-products.js')
const chai = require('chai')
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect
const should = chai.should()

let res

describe('unit tests for get products', () => {
    describe('unit tests for callGetProductsApi() Function', () => {
        it('should call and recieve a valid response from the CBA endpoint', async () => {
            res = await getProducts.callGetProductsApi('CBA', 1)
            res.should.be.an('object')
            expect(res).to.have.property('data');
            expect(res.data).to.have.property('products')
        })
        it('should call and recieve a valid response from the NAB endpoint', async () => {
            res = await getProducts.callGetProductsApi('NAB', 1)
            res.should.be.an('object')
            expect(res).to.have.property('data');
            expect(res.data).to.have.property('products')
        })
        it('should call and recieve a valid response from the ANZ endpoint', async () => {
            res = await getProducts.callGetProductsApi('ANZ', 1, { "product-category": "TRANS_AND_SAVINGS_ACCOUNTS" })
            res.should.be.an('object')
            expect(res).to.have.property('data');
            expect(res.data).to.have.property('products')
        })
        it('should call and recieve a valid response from the WBA endpoint', async () => {
            res = await getProducts.callGetProductsApi('WBA', 1)
            res.should.be.an('object')
            expect(res).to.have.property('data');
            expect(res.data).to.have.property('products')
        })
        it('should throw an error when passed a bank that is not supported', async () => {
            return getProducts.callGetProductsApi('notABank', 1).should.be.rejectedWith(Error)
        })

        it('should throw an error when not passed a paramater for xv', async () => {
            return getProducts.callGetProductsApi('ANZ').should.be.rejectedWith(Error)
        })
        it('should throw an error when not passed an argument for bank', async () => {
            return getProducts.callGetProductsApi(null, 1).should.be.rejectedWith(Error)
        })
        it('should accept and optional paramaters and return an appropriate response', async () => {
            let fullRes = await getProducts.callGetProductsApi('ANZ', 1)
            res = await getProducts.callGetProductsApi('ANZ', 1, { "product-category": "TRANS_AND_SAVINGS_ACCOUNTS" })
            res.should.be.an('object')
            expect(res).to.have.property('data');
            expect(res.data).to.have.property('products')
            expect(res).to.not.equal(fullRes)
        })
    })
    describe('unit tests for getProductsArray() Function', () => {
        it('should return only an array', async () => {
            let fullRes = await getProducts.callGetProductsApi('ANZ', 1)
            let len = fullRes.meta.totalRecords
            res = await getProducts.getProductsArray("ANZ", 1)
            expect(Array.isArray(res))
            expect(res.length).to.equal(len) // Check that the array contains the total number of products
        })
        it('should throw an error if passed incorrect input', async () => {
            return getProducts.getProductsArray('ANZ').should.be.rejectedWith(Error)
        })
        it('should throw an error when passed a value for pagination', async () => {
            return getProducts.getProductsArray('ANZ', 1, { "page-size": "10" }).should.be.rejectedWith(Error)

        })

    })

})