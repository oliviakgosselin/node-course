const express = require('express');

const { MongoClient } = require('mongodb');

const adminRouter = express.Router();
const debug = require('debug')('app:adminRoutes');

const books = [
  {
    bookId: 656,
    title: 'Educated: A Memoir',
    genre: 'Biography',
    author: 'Tara Westover',
    read: false
  },
  {
    bookId: 24280,
    title: 'Educated: A Memoir',
    genre: 'Biography',
    author: 'Tara Westover',
    read: false
  },
  {
    title: 'Educated: A Memoir',
    genre: 'Biography',
    author: 'Tara Westover',
    read: false
  },
  {
    title: 'Educated: A Memoir',
    genre: 'Biography',
    author: 'Tara Westover',
    read: false
  }
];
function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;

        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server, trying to insert books');

          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
