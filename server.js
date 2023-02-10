import app from './app.js';

let port = process.env.PORT ||8080;

app.listen(port, function(err) {
    if(err) {
        console.log('error in start server',err);
        return;
    }
    console.log('your app is ruuning on Port:::',port);
})