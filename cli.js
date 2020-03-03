#!/usr/bin/env node
'use strict'

const program = require('commander')
const getProducts = require('./lib/get-products.js')
const getProductDetails = require('./lib/get-product-details')

program
    .command("getProductArray <bank>, <xv>")
    .option("-c, --product-Category <productCategory>", "The Product Category")
    .option("-x, --xMinV <xMinV>", "Minimum Version")
    .option("-b, --brand <brand>", "The product brand")
    .option("-u, --updated-Since <updatedSince>", "Updated Since Date")
    .option("-e, --effective <effective>", "The effective period, CURRENT, FUTURE or ALL")
    .description("Returns the complete product array for a given bank and given filters")
    .action(async (bank, xv, options) => {
        let inputOptions = []
        if (options.productCategory) {
            let param = {} // Create a parameter object 
            param["product-category"] = options.productCategory // Assign the supplied option value to the parameter obj
            inputOptions.push(param) // Push the pair int the input options array
        }
        if (options.xvMin) {
            let param = {} // Create a parameter object
            param["x-min-v"] = options.xMinV // Assign the supplied option value to the parameter obj
            inputOptions.push(param) // Push the pair int the input options array
        }
        if (options.brand) {
            let param = {} // Create a parameter object
            param["brand"] = options.brand // Assign the supplied option value to the parameter obj
            inputOptions.push(param) // Push the pair int the input options array
        }
        if (options.updatedSince) {
            let param = {} // Create a parameter object
            param["updated-since"] = options.updatedSince // Assign the supplied option value to the parameter obj
            inputOptions.push(param) // Push the pair int the input options array
        }
        if (options.effective) {
            let param = {} // Create a parameter object
            param["effective"] = options.effective // Assign the supplied option value to the parameter obj
            inputOptions.push(param) // Push the pair int the input options array
        }
        console.log(inputOptions)
        console.log("hello")

        let res = await getProducts.getProductsArray(bank, xv, inputOptions)

        console.log(res)

    })

program
    .command("callProductsAPI <bank>, <xv>")
    .option("-c, --product-Category <productCategory>", "The Product Category")
    .option("-x, --xMinV <xMinV>", "Minimum Version")
    .option("-b, --brand <brand>", "The product brand")
    .option("-u, --updated-Since <updatedSince>", "Updated Since Date")
    .option("-e, --effective <effective>", "The effective period, CURRENT, FUTURE or ALL")
    .option("-c, --product-Category", "The Product Category")
    .option("-s, --page-Size <pageSize>", "Custom page size")
    .option("-p, --page <page>", "Page Number")
    .description("Calls the requested bank's product API returning data based on filters ")
    .action(async (bank, xv, options) => {

        let inputOptions = []
        if (options.productCategory) {
            let param = {} // Create a parameter object 
            param["product-category"] = options.productCategory // Assign the supplied option value to the parameter obj
            inputOptions.push(param) // Push the pair int the input options array
        }
        if (options.xvMin) {
            let param = {} // Create a parameter object
            param["x-min-v"] = options.xMinV // Assign the supplied option value to the parameter obj
            inputOptions.push(param) // Push the pair int the input options array
        }
        if (options.brand) {
            let param = {} // Create a parameter object
            param["brand"] = options.brand // Assign the supplied option value to the parameter obj
            inputOptions.push(param) // Push the pair int the input options array
        }
        if (options.updatedSince) {
            let param = {} // Create a parameter object
            param["updated-since"] = options.updatedSince // Assign the supplied option value to the parameter obj
            inputOptions.push(param) // Push the pair int the input options array
        }
        if (options.effective) {
            let param = {} // Create a parameter object
            param["effective"] = options.effective // Assign the supplied option value to the parameter obj
            inputOptions.push(param) // Push the pair int the input options array
        }
        if (options.page) {
            let param = {} // Create a parameter object
            param["page"] = options.page // Assign the supplied option value to the parameter obj
            inputOptions.push(param) // Push the pair int the input options array
        }
        if (options.pageSize) {
            let param = {} // Create a parameter object
            param["page-size"] = options.pageSize // Assign the supplied option value to the parameter obj
            inputOptions.push(param) // Push the pair int the input options array
        }

        let res;

        res = await getProducts.callGetProductsApi(bank, xv, inputOptions)



        console.log(res)
    })

program
    .command("callGetProductDetailsApi <bank>, <xv>, <productID>")
    .option("-x, --xMinV <xminv>", "minimum version number")
    .description("Returns the complete product details for a specified product ID")
    .action(async (bank, xv, productID, options) => {
        let res;
        if (options.xMinV) {
            try {
                res = await getProductDetails.getProductDetails(bank, xv, productID, options.xminv)
            } catch (error) {
                console.log(error)
            }
        } else {
            res = await getProductDetails.getProductDetails(bank, xv, productID)
        }
        console.log(res)
    })

program.parse(process.argv)

