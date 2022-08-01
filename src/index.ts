const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('dist'));

app.get('/', (req, res ) => {
    res.send('index');
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});