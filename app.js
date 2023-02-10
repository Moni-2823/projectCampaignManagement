import * as dotenv from 'dotenv'       
import express from 'express'; // import express module

import Routes from './routes/index.js';
import connectMongo from './config/dbconnection.js';
dotenv.config()

connectMongo();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
extended: true
}));

//all routes here
app.use(Routes);

app.use(function(req,res,next) {
    res.status(404).send({message: "No Matching Route Please Check Again...!!"});
    return
});
 // error handler
 // define as the last app.use callback
app.use(function(err, req, res, next) {
console.log('err', err)
res.status(err.status || 500);
res.json({
    Error: {
        message: err.message
    }
});
});

export default app;