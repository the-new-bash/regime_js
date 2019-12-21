#!/usr/bin/env node
'use strict'

const program = require('commander')
const getProducts = require('./lib/get-products.js')

program
    .command("getAllProducts <bank>")
    .description("gets all products for a given bank")
    .action((bank) => {
        getProducts.printProducts(bank)
    })

program.parse(process.argv);