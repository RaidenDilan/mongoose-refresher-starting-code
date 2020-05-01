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
  console.log(createdProduct); // => string
  const result = await createdProduct.save();
  console.log(typeof createdProduct.id);  // => string
  console.log(typeof createdProduct._id); // => object
  res.json(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
