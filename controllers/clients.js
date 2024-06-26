const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const DATABASE = "HotelierPro";
const COLLECTION_NAME = "clients";

const getAllClient = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .find();

  // console.log("mongodb: " + JSON.stringify(mongodb));
  // console.log("mongodb.getDatabase(): " + JSON.stringify(mongodb.getDatabase()));
  // console.log("mongodb.getDatabase().db(): " + JSON.stringify(mongodb.getDatabase().db()));
  // console.log("mongodb.getDatabase().db().collection(COLLECTION_NAME): " + JSON.stringify(mongodb.getDatabase().db().collection(COLLECTION_NAME)));
  result.toArray((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });

  // .then((users) => {
  //   res.setHeader('Content-Type', 'application/json');
  // res.status(200).json(users);
  // });
};

const getSingleClient = async (req, res) => {
  const clientId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .find({ _id: clientId });
  result.toArray((err, result) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  });

  // .then((users) => {
  //   res.setHeader('Content-Type', 'application/json');
  //   res.status(200).json(users[0]);
  // });
};

const createClient = async (req, res) => {
  const client = {
    username: 'required|string',
    name: 'required|string',
    address: 'string',
    birthdate: 'datetime',
    email: 'string',
    active: 'boolean',
    hotelss: 'array'
  };
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .insertOne(client);

  console.log('response: ' + JSON.stringify(response));
  if (response.acknowledged == true) {
    res.status(201).send();
  } else {
    res.status(500).json(response.error || 'Failed to create user.');
  }
};
const updateClient = async (req, res) => {
  const clientId = new ObjectId(req.params.id);
  const client = req.body.clientIds
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .replaceOne({ _id: clientId }, client);
  console.log('response: ' + JSON.stringify(response));
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to update user.');
  }
};
const deleteClient = async (req, res) => {
  const clientId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: clientId });
  console.log('response: ' + JSON.stringify(response));
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to update user.');
  }
};

module.exports = {
  getAllClient,
  getSingleClient,
  createClient,
  updateClient,
  deleteClient
};