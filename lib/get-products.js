'use strict'

const request = require('request')

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


const getAllProducts = ((bank,xv,xvmin)=>{
  const prod_req = {
      url: 'https://api.anz/cds-au/v1/banking/products',
      method: 'GET',
      headers: {
          'x-v': xv,
          'x-v-min': xvmin
      }
  };
  request(prod_req, function(err, res, body) {
      let json = JSON.parse(body);
      console.log(json);
  });
})

getAllProducts('anz',1,1)

module.exports ={
    getAllProducts
}