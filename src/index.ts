const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

let port;
process.env.STATUS === 'production'
    ? (port = process.env.PROD_PORT)
    : (port = process.env.DEV_PORT);

app.use(express.static('dist'));

app.use(function(err, req, res, next) {
    console.error(err.stack);
    //res.status(404).send('Something broke!');
    next(err);
});

app.get('/', (req, res ) => {
    res.send('index');
})

app.listen(port, () => {
    console.log(`${process.env.STATUS} Server running at http://localhost:${port}`)
});