const MongoClient = require('mongodb').MongoClient;

const url = `mongodb+srv://${process.env.MONGO_CLIENT_USERNAME}:${process.env.MONGO_CLIENT_PASSWORD}@cluster0-jxlm3.mongodb.net/products_test?retryWrites=true&w=majority`;

MongoClient.connect(url);

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price
  };

  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection('products').insertOne(newProduct);
  }
  catch(err) {
    return res.json({ message: 'Could not store Data!' });
  }

  client.close();
  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);
  let products;

  try {
    await client.connect();
    const db = client.db();
    products = await db.collection('products').find().toArray();
  }
  catch(err) {
    return res.json({ message: 'Could not retrieve products!' });
  }

  client.close();
  res.json(products);
};

module.exports = { createProduct, getProducts };
