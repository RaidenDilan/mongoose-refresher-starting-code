const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.MONGO_CLIENT_USERNAME}:${process.env.MONGO_CLIENT_PASSWORD}@cluster0-jxlm3.mongodb.net/products_test?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then(() => console.log('Connect to database'))
  .catch(() => console.log('Connection failed'));

const Product = require('./models/product');

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price
  });
  const result = await createdProduct.save();
  res.json(result);
};

exports.createProduct = createProduct;
