"use strict"
const { search_items } = require("./search_items")
const fetch = require("node-fetch")
const { URL, URLSearchParams } = require('url');

const items_prices = async (img_name) => {
    const query_list = await search_items(img_name)
    const query_str = query_list.join("|")

    const search_url = new URL("https://api.wegmans.io/products/search")

    const params = {
        "Subscription-Key": "c59dd53a607f42ae830de7469a83a985",
        "query": query_str,
        "api-version": "2018-10-18",
        method: "POST"
    }
    search_url.search = new URLSearchParams(params)
    const response = await fetch(search_url)  
    const json = await response.json()
    let items = {}
    json.results.forEach(result => {
        items[result.sku] = result.name
    })
    return items
}

exports.items_prices = items_prices