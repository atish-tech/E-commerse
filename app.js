const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// default get api
app.get('/' , (request , response) => {
    response.json({message : 'API is running'});
})

// local routes
const connectDB = require('./config/connectDB');
const authRouter = require('./routes/Auth/auth');
const productRoute = require('./routes/Product/products.route');
const cartRoute = require('./routes/Product/product.cart.route');

connectDB();   // connect DataBase

// Routes
app.use(authRouter);
app.use(productRoute);
app.use(cartRoute);

app.listen(8000);