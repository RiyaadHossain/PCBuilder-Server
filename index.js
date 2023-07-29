require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5001;

const cors = require('cors');

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db('PC-Builder');
    const categoryCollection = db.collection('categories');
    const productCollection = db.collection('products');

    app.get('/products', async (req, res) => {
      const cursor = productCollection.find({}).sort({ publicationDate: -1 });
      const products = await cursor.toArray();

      res.send({ status: true, data: products });
    });

    app.get('/categories', async (req, res) => {
      const cursor = categoryCollection.find({}).sort({ publicationDate: -1 });
      const categories = await cursor.toArray();

      res.send({ status: true, data: categories });
    });

    app.get('/products/:category', async (req, res) => {
      const category = req.params.category
      const cursor = categoryCollection.find({ category }).sort({ publicationDate: -1 });
      const products = await cursor.toArray();

      res.send({ status: true, data: products });
    });

  } finally {
  }
};

run().catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

  // Reviews API
/*     app.post('/review/:id', async (req, res) => {
      const bookId = req.params.id;
      const review = req.body;

      const result = await bookCollection.updateOne(
        { _id: ObjectId(bookId) },
        { $push: { reviews: review } }
      );


      if (result.modifiedCount !== 1) {
        res.json({ error: 'Book not found or review not added' });
        return;
      }

      res.json({ message: 'Review added successfully' });
    });

    app.get('/review/:id', async (req, res) => {
      const bookId = req.params.id;

      const result = await bookCollection.findOne(
        { _id: ObjectId(bookId) },
        { projection: { _id: 0, reviews: 1 } }
      );

      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    });

    app.patch('/review/:id/user/:email', async (req, res) => {
      const bookId = req.params.id;
      const userEmail = req.params.email
      const updatedReview = req.body.review

      const result = await bookCollection.findOneAndUpdate(
        { _id: ObjectId(bookId), "reviews.userEmail": userEmail },
        { $set: { "reviews.$.review": updatedReview } }
      );

      if (result) {
        return res.json(result);
      }

      res.status(404).json({ error: 'Book not found' });
    });

    app.delete('/review/:id/user/:email', async (req, res) => {
      const bookId = req.params.id;
      const userEmail = req.params.email

      const result = await bookCollection.findOneAndUpdate(
        { _id: ObjectId(bookId) },
        { $pull: { reviews: { userEmail } } }
      );

      if (result) {
        return res.json(result);
      }

      res.status(404).json({ error: 'Book not found' });
    }); */
