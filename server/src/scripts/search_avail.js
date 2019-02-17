"use strict"
console.time("runtime")
const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


const { search_results } = require('./search_results')
const fetch = require("node-fetch")
const { URL, URLSearchParams } = require('url');
const params = {
    "Subscription-Key": "c59dd53a607f42ae830de7469a83a985",
    "api-version" : "2018-10-18"
}

// app.use(bodyParser.json());

app.post('/upload', (req, res) => {
    const container = async (img_name) => {
        const avail_locations = async (sku) => {
            let url = new URL(`https://api.wegmans.io/products/${sku}/availabilities`)
            url.search = new URLSearchParams(params)
    
            const response = await fetch(url)
            const json = await response.json()
            let avail = []
            json.stores.forEach(st => {
                avail.push(st.store)  
            })
            return avail
        }
        const avail_price = async (sku, store) => {
            let url = new URL(`https://api.wegmans.io/products/${sku}/prices/${store}`)
            url.search = new URLSearchParams(params)
    
            const response = await fetch(url)
            const json = await response.json()
            return json.price
        }
        const get_images = async (sku) => {
            let url = new URL(`https://api.wegmans.io/products/${sku}`)
            url.search = new URLSearchParams(params)
    
            const response = await fetch(url)
            const json = await response.json()
    
            return json.tradeIdentifiers[0].images[0]
        }
        const get_list = async (img_name) => {return await search_results(img_name)}
        let item_list = await get_list(img_name) 
        let item_info = []
        // console.log(Object.keys(item_list).length)
        for (let key in item_list){
            let locs = await avail_locations(key)
            if (locs.length > 0){
                let lowest_loc = locs[0]
                let minimum = Infinity
                for (let i = 0; i < locs.length; i++){
                    let price = await avail_price(key, locs[i])
                    if (price < minimum){
                        minimum = price
                        lowest_loc = locs[i]
                    }
                }
                item_info.push([key, lowest_loc, minimum])
            }
            // console.log(key)
        }
        for (let i = 0; i < item_info.length; i++){
            let image = await get_images(item_info[i][0])
            item_info[i].push(image)
        }
        // console.log(item_info)
        console.timeEnd("runtime")
        return item_info
    }
    container("oranges")
})


// exports.container = container