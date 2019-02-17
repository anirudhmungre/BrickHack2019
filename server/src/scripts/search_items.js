"use strict"

const search_items = async (imageName) => {
    let items = [];
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs label detection on the image file
    const [result] = await client.labelDetection('../resources/' + imageName + '.jpg');
    const labels = result.labelAnnotations;
    labels.forEach(label => items.push(label.description));
    // console.log(items);
    return items;
}

exports.search_items = search_items