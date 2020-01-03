/* eslint-disable no-undef */
'use strict'

const getProducts = require('../lib/get-products.js')
const chai = require('chai')
const assert = chai.assert
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
            res = await getProducts.callGetProductsApi('ANZ', 1)
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
        it('should throw an error when passed a bank that is not supported')
        it('should populate xv min and xv with default values if they are not specified')
        it('should throw an error when passed an invalid xv paramater')
        it('should accept and optional paramaters and return an appropriate response')
    })
    describe('unit tests for getAllProducts() Function', () => {


    })
    describe('unit tests for getProductCategory() Function', () => {

    })
})