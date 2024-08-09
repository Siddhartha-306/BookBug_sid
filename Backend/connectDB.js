const mongoose = require("mongoose");
require("dotenv").config;
const URI = process.env.URI;

const connectDB = async () => {
    try{
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to DB successfully");
    }
    catch(error){
        console.log(error);
    }
};

connectDB();
