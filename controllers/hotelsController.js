const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const DATABASE = "sample_analytics";
const COLLECTION_NAME = "hotels";

// Controller functions for hotels collection

// GET all hotels
const getAllHotels = async (req, res) => {
    try {
        const hotels = await mongodb
            .getDatabase()
            .db(DATABASE)
            .collection(COLLECTION_NAME)
            .find()
            .toArray();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET a single hotel by ID
const getSingleHotel = async (req, res) => {
    const hotelId = new ObjectId(req.params.id);
    try {
        const hotel = await mongodb
            .getDatabase()
            .db(DATABASE)
            .collection(COLLECTION_NAME)
            .findOne({ _id: hotelId });
        if (!hotel) {
            res.status(404).json({ message: "Hotel not found" });
            return;
        }
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new hotel
const createHotel = async (req, res) => {
    const newHotel = req.body;
    try {
        const response = await mongodb
            .getDatabase()
            .db(DATABASE)
            .collection(COLLECTION_NAME)
            .insertOne(newHotel);
        res.status(201).json(response.ops[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT/update a hotel by ID
const updateHotel = async (req, res) => {
    const hotelId = new ObjectId(req.params.id);
    const updatedHotel = req.body;
    try {
        const response = await mongodb
            .getDatabase()
            .db(DATABASE)
            .collection(COLLECTION_NAME)
            .replaceOne({ _id: hotelId }, updatedHotel);
        if (response.modifiedCount === 0) {
            res.status(404).json({ message: "Hotel not found" });
            return;
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE a hotel by ID
const deleteHotel = async (req, res) => {
    const hotelId = new ObjectId(req.params.id);
    try {
        const response = await mongodb
            .getDatabase()
            .db(DATABASE)
            .collection(COLLECTION_NAME)
            .deleteOne({ _id: hotelId });
        if (response.deletedCount === 0) {
            res.status(404).json({ message: "Hotel not found" });
            return;
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllHotels,
    getSingleHotel,
    createHotel,
    updateHotel,
    deleteHotel
};
