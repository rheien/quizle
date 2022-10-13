const express = require('express');
const request = require('request');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/api/v1/questions/', (req, res) => {
    request(
        { url: 'http://localhost:8888/api/v1/questions/'},
        (error, response, body) => {
            if  (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message });
            }
            res.json(JSON.parse(body));
        }
    )
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});