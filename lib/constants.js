module.exports = {
    BANK_ABBRS: ["ANZ", "CBA", "NAB", "WBA"],
    BANK_HOLDERS: {
        ANZ: "https://api.anz",
        CBA: "https://api.commbank.com.au",
        NAB: "https://openbank.api.nab.com.au",
        WBA: "https://digital-api.westpac.com.au"
    },


    CDS_AU: "/cds-au/v1",

    PRODUCTS_SUFFIX: "/banking/products",

    OPTIONAL_QUERY_PARAMATERS: ["effective", "updated-since", "brand", "product-category", "page", "page-size"],

    PRODUCT_CATEGORIES: {
        "TRANS_AND_SAVINGS_ACCOUNTS": 0,
        "TERM_DEPOSITS": 1,
        "TRAVEL_CARDS": 2,
        "REGULATED_TRUST_ACCOUNTS": 3,
        "RESIDENTIAL_MORTGAGES": 4,
        "CRED_AND_CHRG_CARDS": 5,
        "PERS_LOANS": 6,
        "MARGIN_LOANS": 7,
        "LEASES": 8,
        "TRADE_FINANCE": 9,
        "OVERDRAFTS": 10,
        "BUSINESS_LOANS": 11

    },

    //Error Message Constants
    INCORRECT_INPUT_ERROR_MSG: "Incorrect User input",
    MISSING_INPUT_ERROR_MSG: "Missing mandatory parameter",
    DO_NOT_APPLY_PAGINATON_ERROR_MSG: "Invalid argument provided, do not change page size or page number"
}
