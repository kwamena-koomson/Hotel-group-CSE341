const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const DATABASE = "HotelierPro";
const COLLECTION_NAME = "bookings";

const getAllBookings = async (req, res) => {
  console.log("getAllBookings");
  const result = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .find();
  console.log("result: " + JSON.stringify(result));


  console.log("mongodb: " + mongodb);
  
  console.log("mongo: " + (await mongodb.getDatabase())[0]
  )
  // Object.entries(((await mongodb.getDatabase()
  //   .db(DATABASE).listCollections())[0])).forEach(([key,val]) => {
  //     console.log("kay: " + key + " value: " + val);
  //   });
  
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

const getSingleBookings = async (req, res) => {
  const bookingsId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .find({ _id: bookingsId });
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

const createBookings = async (req, res) => {
  const bookings = {
    bookings_id: req.body.id,
    limit: req.body.limit

  };
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .insertOne(bookings);

  console.log('response: ' + JSON.stringify(response));
  if (response.acknowledged == true) {
    res.status(201).send();
  } else {
    res.status(500).json(response.error || 'Failed to create user.');
  }
};
const updateBookings = async (req, res) => {
  const bookingsId = new ObjectId(req.params.id);
  const bookings = {
    bookings_id: req.body.id,
    limit: req.body.limit
  };
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .replaceOne({ _id: bookingsId }, bookings);
  console.log('response: ' + JSON.stringify(response));
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to update user.');
  }
};
const deleteBookings = async (req, res) => {
  const bookingsId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: bookingsId });
  console.log('response: ' + JSON.stringify(response));
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to update user.');
  }
};

module.exports = {
  getAllBookings,
  getSingleBookings,
  createBookings,
  updateBookings,
  deleteBookings
};