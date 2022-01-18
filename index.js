const express = require('express');
const request = require('request-promise'); // for making API requests

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = 'f7f2cc2528fb6fc5b287c145a1c5b677';
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => { //creating route
    res.send('Welcome to Amazon Scraper API.');
});

//GET Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
}); //productId is going to be dynamic


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
