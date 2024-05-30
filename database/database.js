const { MongoClient } = require('mongodb');
require('dotenv').config();

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('Database is already initialized!');
        return callback(null, _db);
    }

    const connectionString = process.env.MONGODB_URL;
    console.log('Connection String:', connectionString);

    if (!connectionString) {
        console.error('No MongoDB connection string provided.');
        return callback(new Error('No MongoDB connection string provided.'));
    }

    MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Database not initialized');
    }
    return _db;
};



module.exports = {
    initDb,
    getDb
};
