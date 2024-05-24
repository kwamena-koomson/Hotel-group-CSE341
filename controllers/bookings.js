const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const DATABASE = "sample_analytics";
const COLLECTION_NAME = "bookings";

const getAllBookings = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .find();
  result.toArray((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingleBooking = async (req, res) => {
  const bookingId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .find({ _id: bookingId });
  result.toArray((err, result) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  });
};

const createBooking = async (req, res) => {
  const booking = {
    booking_id: req.body.id,
    client_id: req.body.clientId,
    hotel_id: req.body.hotelId,
    check_in_date: req.body.checkInDate,
    check_out_date: req.body.checkOutDate,
  };
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .insertOne(booking);

  if (response.acknowledged == true) {
    res.status(201).send();
  } else {
    res.status(500).json(response.error || 'Failed to create booking.');
  }
};

const updateBooking = async (req, res) => {
  const bookingId = new ObjectId(req.params.id);
  const booking = {
    client_id: req.body.clientId,
    hotel_id: req.body.hotelId,
    check_in_date: req.body.checkInDate,
    check_out_date: req.body.checkOutDate,
  };
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .replaceOne({ _id: bookingId }, booking);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to update booking.');
  }
};

const deleteBooking = async (req, res) => {
  const bookingId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db(DATABASE)
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: bookingId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Failed to delete booking.');
  }
};

module.exports = {
  getAllBookings,
  getSingleBooking,
  createBooking,
  updateBooking,
  deleteBooking
};
