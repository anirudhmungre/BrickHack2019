"use strict"
const { search_items } = require("./search_items")
const fetch = require("node-fetch")
const { URL, URLSearchParams } = require('url');

search_items("General-Tao").then(token => {
    const base_url = new URL("https://api.wegmans.io")
    const search_url = new URL("https://api.wegmans.io/products/search")
    console.log(token.join("|"))

    const params = {
        "Subscription-Key": "c59dd53a607f42ae830de7469a83a985",
        "query": token.join("|"),
        "api-version": "2018-10-18",
        method: "POST"
    }
    search_url.search = new URLSearchParams(params)
    fetch(search_url)
        .then(data => { return data.json() })
        .then(res => {
            // console.log(res.results)
            res.results.forEach(result => {
                console.log(result.name)
                // 0 -> self
                // 1 -> locations
                // 2 -> availabilities
                // 3 -> prices
                console.log(base_url.origin + result._links[2].href)
                console.log(base_url.origin + result._links[3].href)
            });
        })
        .catch(error => console.log(error))
})