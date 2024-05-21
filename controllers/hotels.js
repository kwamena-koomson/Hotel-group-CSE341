const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const DATABASE = "sample_analytics";
const COLLECTION_NAME = "hotelss";

const getAllHotels = async (req, res) => {
  console.log("getAllhotels");
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

const getSingleHotels = async (req, res) => {
  const hotelsId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .find({ _id: hotelsId });
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

const createHotels = async (req, res) => {
  const hotels = {
    hotels_id: req.body.id,
    limit: req.body.limit,
    products: req.body.product,

  };
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .insertOne(hotels);

  console.log('response: ' + JSON.stringify(response));
  if (response.acknowledged == true) {
    res.status(201).send();
  } else {
    res.status(500).json(response.error || 'Failed to create user.');
  }
};
const updateHotels = async (req, res) => {
  const hotelsId = new ObjectId(req.params.id);
  const hotels = {
    firstName: req.body['first name'],
    lastName: req.body['last name'],
    email: req.body.email,
    gender: req.body.gender,
    birthday: req.body.birthday,
    address: req.body.address,
    phone: req.body.phone
  };
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .replaceOne({ _id: hotelsId }, hotels);
  console.log('response: ' + JSON.stringify(response));
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to update user.');
  }
};
const deleteHotels = async (req, res) => {
  const hotelsId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: hotelsId });
  console.log('response: ' + JSON.stringify(response));
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to update user.');
  }
};

module.exports = {
  getAllHotels,
  getSingleHotels,
  createHotels,
  updateHotels,
  deleteHotels
};