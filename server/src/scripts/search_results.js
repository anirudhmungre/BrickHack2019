"use strict"
const { search_items } = require("./search_items")
const fetch = require("node-fetch")
const { URL, URLSearchParams } = require('url');

search_items("oranges").then(token => {
    const url = new URL("https://api.wegmans.io/products/search")
    console.log(token.join("|"))   

    const params = {
        "Subscription-Key":"c59dd53a607f42ae830de7469a83a985",
        "query": token.join("|"),
        "api-version":"2018-10-18",
        method: "POST"
    }
    url.search = new URLSearchParams(params)
    fetch(url)
    .then(data=>{return data.json()})
    .then(res=>{console.log(res)})
    .catch(error=>console.log(error))
})