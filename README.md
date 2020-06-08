# regime_js

[![Build status](https://badge.buildkite.com/85ad47463eff33c35b2fb6e8009eb959f7e1f09de61401e3cf.svg)](https://buildkite.com/the-new-bash/regime-js-test-and-publish)

Australian Open Banking API NodeJS client.

This client allows you to call the existing endopoints for the Australion Open Banking Consumer Data Right. All functions are asyncronous and promise native.

## Installation and useage

```bash
$ npm install regime_js
```

Once installed the package can be used from the command line Example:

```bash
$ regime getProductArray ANZ 1
```

Will return the entire products array for ANZ xv 1

</br>

To use in your project require the package:

```js
const regime = require("regime_js");
```

## Testing

This unit contains both unit and functional tests so you can see the performance of the end points.

To run both sets of tests including audit and code coverage run this command;

```bash
$ npm test
```

To only run the functional tests;

```bash
$ npm run-script funcTest
```

To only run the unit tests

```bash
$ npm run-script unitTest
```

A mochawesome report for each test type will be automatically generated and stored in the root directory.

## Functions

The functions available for use

## Get Products API Functions

### getProductsArray()

`getProductsArray(bank, xv, [xvmin] [effective], [updated-since], [brand], [product-category], [page"], [page-size]) => Promise`

The getProductsArray() function calls the requested bank's endpoint with the requested filters, and automatically paginates to return the entire products array. This function cannot be combined with user pagination. All Optional Paramaters must be passed in as a key value pair object with the name and the value. Please see [parameters](#Supported-Parameters) section for details of optional supported input.

**_Examples_**

```js
const regime = require("regime_js");
async function printBankProducts() {
  let WBAProducts;
  try {
    WBAProducts = await regime.getProductsArray("WBA", 1, {
      "product-category": "TRANS_AND_SAVINGS_ACCOUNTS",
    });
  } catch (error) {
    console.log(error);
  }
  console.log(WBAProducts);
}
```

This will print the complete product array for all Transaction and Savings account supplied by the Westpac open banking API endpoint

Example Array member

```json
{
  "productId": "String",
  "lastUpdated": "2019-09-18T05:52:35Z",
  "productCategory": "TRANS_AND_SAVINGS_ACCOUNTS",
  "name": "String",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis interdum dolor.",
  "brand": "Bank",
  "isTailored": "false",
  "additionalInformation": {
    "overviewUri": "url"
  }
}
```

The below will do the same from the command line with an optional parameter included:

```bash
regime getProductArray WBA 1 {{"product-category":"TRANS_AND_SAVINGS_ACCOUNTS"}}
```

### callGetProductsApi()

`getProductsArray(bank, xv, [xvmin] [page-size], [page], [effective], [updated-since], [brand], [product-category]) => Promise`
The CallGetProductsApi() function directly calls the endpoint of the specified bank using the specified version number. Any number or combination of CDR speficed filtering values may be used. The function will return the unfiltered response object. Please see [parameters](#Supported-Parameters) section for details of supported input.
**_Examples_**
Running the code below

```js
const regime = require("regime_js");
async function getProducts() {
  let res;
  try {
    res = await regime.callGetProductsApi("ANZ", 1);
  } catch (error) {
    console.log(error);
  }
  console.log(res);
}
getProducts();
```

will return something like this:

```json
{
  "data": {
    "products": [
      ///This Array Contains product objects for the specified bank
    ]
  },
  "meta": { "totalRecords": 28, "totalPages": 2 },
  "links": {
    "self": "url",
    "next": "url",
    "first": "url",
    "last": "url"
  }
}
```

From command line

```bash
$ regime callProductsAPI ANZ 1
```

### Get Product details API Functions

These functions use the product details endpoint for the specifed bank to return the specified data.

### callGetProductDetails()

The callGetProductDetails() function calls the specified bank endpoint, for the specified productID. This endpoint does not support pagination or any custom paramaters. xminv is the only optional paramater.

`callGetProductDetails(bank, xv, productID, [xminv]) => Promise`

**_Examples_**

Running the code below

```js
const regime = require("regime_js");
async function getProductDetails(){
let res
try {
    res = await regime.callGetProductDetails('ANZ', 1'3a86f9e4-1b41-4222-9091-5934d1fc9178')
    } catch(error) {
    console.log(error)
}
    console.log(res)
}
getProductDetails()
```

will return something like this:

```json
{
  "data": {
    "lastUpdated": "2020-02-20T04:07:19.779670Z",
    "additionalInformation": {
      "eligibilityUri": "URI",
      "feesAndPricingUri": "URI",
      "termsUri": "URI",
      "overviewUri": "URI"
    },
    "fees": [
      //This Array contains fees objects for the product
    ],
    "isTailored": false,
    "lendingRates": [
      //This Array contains lending rates objects for the product
    ],
    "productId": "3a86f9e4-1b41-4222-9091-5934d1fc9178",
    "name": "Product Name String",
    "description": "Product Description String",
    "applicationUri": "URI",
    "effectiveFrom": "2020-02-20T13:00:00Z",
    "brand": "ANZ",
    "productCategory": "RESIDENTIAL_MORTGAGES"
  },
  "meta": {},
  "links": {
    "self": "URL"
  }
}
```

From the command line

```bash
$ regime callGetProductDetailsApi ANZ 1 3a86f9e4-1b41-4222-9091-5934d1fc9178
```

## Supported Paramaters

Details of the all supported paramaters can be found in the [Consumer Data Right Standard]

### Get Products API Parameters

| Name             | Type            | Required  | Supported Functions                 | Description                                                                                                                                                                                                                                                                                                        |
| ---------------- | --------------- | --------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| effective        | string          | optional  | getProducts(), callGetProductsApi() | Allows for the filtering of products based on whether the current time is within the period of time defined as effective by the effectiveFrom and effectiveTo fields. Valid values are ‘CURRENT’, ‘FUTURE’ and ‘ALL’. If absent defaults to 'CURRENT'                                                              |
| updated-since    | DateTimeString  | optional  | getProducts(), callGetProductsApi() | Only include products that have been updated after the specified date and time. If absent defaults to include all products                                                                                                                                                                                         |
| brand            | string          | optional  | getProducts(), callGetProductsApi() | Filter results based on a specific brand                                                                                                                                                                                                                                                                           |
| product-category | string          | optional  | gcallGetProductsApi()               | Used to filter results on the productCategory field applicable to accounts. Any one of the valid values for this field can be supplied. If absent then all accounts returned.                                                                                                                                      |
| page             | PositiveInteger | optional  | callGetProductsApi()                | Page of results to request (standard pagination)                                                                                                                                                                                                                                                                   |
| page-size        | PositiveInteger | optional  | callGetProductsApi()                | Page size to request. Default is 25 (standard pagination)                                                                                                                                                                                                                                                          |
| x-v              | string          | mandatory | getProducts(), callGetProductsApi() |                                                                                                                                                                                                                                                                                                                    | Version of the API end point requested by the client. Must be set to a positive integer. The data holder should respond with the highest supported version between x-min-v and x-v. If the value of x-min-v is equal to or higher than the value of x-v then the x-min-v header should be treated as absent. If all versions requested are not supported then the data holder should respond with a 406 Not Acceptable. See HTTP Headers |
| x-min-v          | string          | optional  | getProducts(), callGetProductsApi() | Minimum version of the API end point requested by the client. Must be set to a positive integer if provided. The data holder should respond with the highest supported version between x-min-v and x-v. If all versions requested are not supported then the data holder should respond with a 406 Not Acceptable. |

**Enumerated Values**
|Parameter| Value|Supported Functions|
|:--------- |:------ |:------ |
|effective |CURRENT |getProducts(), callGetProductsApi()|
|effective |FUTURE|getProducts(), callGetProductsApi()|
|effective |ALL|getProducts(), callGetProductsApi()|
|product-category |TRANS_AND_SAVINGS_ACCOUNTS|getProducts(), callGetProductsApi()|
|product-category |TERM_DEPOSITS |getProducts(), callGetProductsApi()|
|product-category |TRAVEL_CARDS |getProducts(), callGetProductsApi()|
|product-category |REGULATED_TRUST_ACCOUNTS |getProducts(), callGetProductsApi()|
|product-category |RESIDENTIAL_MORTGAGES |getProducts(), callGetProductsApi()|
|product-category |CRED_AND_CHRG_CARDS |getProducts(), callGetProductsApi()|
|product-category |PERS_LOANS |getProducts(), callGetProductsApi()|
|product-category |MARGIN_LOANS |getProducts(), callGetProductsApi()|
|product-category |LEASES |getProducts(), callGetProductsApi()|
|product-category |TRADE_FINANCE |getProducts(), callGetProductsApi()|
|product-category |OVERDRAFTS |getProducts(), callGetProductsApi()|
|product-category |BUSINESS_LOANS|getProducts(), callGetProductsApi()|

## Authors

Nikki Renvoize

[consumer data right standard]: https://consumerdatastandardsaustralia.github.io/standards/#get-products
