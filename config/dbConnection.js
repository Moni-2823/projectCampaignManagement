import mongoose from "mongoose"; //import mongoose module

function connectMongo() {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.DBURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        mongoose.connection.on('connected', ()=> {
            console.log(':::connected to database:::');
        });
        mongoose.connection.on('disconnected', ()=> {
            console.log('disconnected to database');
        });

        //event to catch error in the database connection
        mongoose.connection.on('error', (err)=>{
            console.log('error in connection',err);
        });
    } catch(error) {
        console.log('db connection error:::',error);
    }
}

export default connectMongo