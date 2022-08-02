const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.static('dist'));

app.get('/', (req, res ) => {
    res.send('index');
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});