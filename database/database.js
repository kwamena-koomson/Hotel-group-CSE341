const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }

  MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
      _db = client.db(process.env.DATABASE_NAME);
      console.log('Successfully connected to MongoDB.');
      callback(null, _db);
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB', err);
      callback(err);
    });
};

const getDatabase = () => {
  if (!_db) {
    throw new Error('Database not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDatabase
};
