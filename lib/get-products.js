'use strict'

const request = require('request')
const c = require('./constants.js')
const utils = require('./utils.js')

const banks = c.BANK_ABBRS

// const options = {
//     url: 'https://www.reddit.com/r/funny.json',
//     method: 'GET',
//     headers: {
//         'Accept': 'application/json',
//         'Accept-Charset': 'utf-8',
//         'User-Agent': 'my-reddit-client'
//     }
// };
// request(options, function(err, res, body) {
//     let json = JSON.parse(body);
//     console.log(json);
// });


async function getAllProducts(bank, xv, xvmin) {
    if (!(banks.includes(bank))) {
        throw new Error(`${c.INCORRECT_INPUT_ERROR_MSG}, ${bank}`)
    }

    const prod_req = {
        url: `${c.BANK_ENDPOINTS[bank]}${c.PRODUCTS_SUFFIX}`,
        method: 'GET',
        headers: {
            'x-v': xv,
            'x-v-min': xvmin
        }
    };

    return new Promise((resolve, reject) => {
        try {
            request(prod_req, function (err, res, body) {
                let jsonRes = JSON.parse(body);
                resolve(jsonRes)
            })

        } catch (error) {
            reject("I failed")

        }
    })

}

// async function justProm(bool) {
//     return new Promise((resolve, reject) => {
//         if (bool) {

//             resolve("I resolved")
//         } else {
//             reject("I rejected")
//         }
//     })
// }

// async function testing() {
//     let tests = await justProm(true)
//     console.log(tests)
// }



async function printProducts(bank) {
    let anzProds
    let proudctArray

    try {
        anzProds = await (getAllProducts(bank, 1, 1))
        proudctArray = anzProds.data.products

    } catch (error) {
        console.log(error)
    }

    console.log(proudctArray)
}

printProducts('ANZ')

//utils.objPrinter(anzProds.data.products)


module.exports = {
    getAllProducts,
    printProducts
}