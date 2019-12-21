#!/usr/bin/env node 
'use strict'

const program = require('commander')

program
    .command("hello")
    .action(()=>{
        console.log("Hello, World!")
    })

program.parse(process.argv);