import express,{ Express,Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.use(express.static('dist'));

app.get('/', (req: Request, res: Response ) => {
    res.send();
})

app.listen(port);