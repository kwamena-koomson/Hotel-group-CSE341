const mongodb = require('../database/database');
const ObjectId = require('mongodb').ObjectId;

const DATABASE = "sample_analytics";
const COLLECTION_NAME = "staff";

// Controller functions for staff collection

// GET all staff members
const getAllStaff = async (req, res) => {
    try {
        const staff = await mongodb
            .getDatabase()
            .db(DATABASE)
            .collection(COLLECTION_NAME)
            .find()
            .toArray();
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET a single staff member by ID
const getSingleStaff = async (req, res) => {
    const staffId = new ObjectId(req.params.id);
    try {
        const staff = await mongodb
            .getDatabase()
            .db(DATABASE)
            .collection(COLLECTION_NAME)
            .findOne({ _id: staffId });
        if (!staff) {
            res.status(404).json({ message: "Staff member not found" });
            return;
        }
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new staff member
const createStaff = async (req, res) => {
    const newStaff = req.body;
    try {
        const response = await mongodb
            .getDatabase()
            .db(DATABASE)
            .collection(COLLECTION_NAME)
            .insertOne(newStaff);
        res.status(201).json(response.ops[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT/update a staff member by ID
const updateStaff = async (req, res) => {
    const staffId = new ObjectId(req.params.id);
    const updatedStaff = req.body;
    try {
        const response = await mongodb
            .getDatabase()
            .db(DATABASE)
            .collection(COLLECTION_NAME)
            .replaceOne({ _id: staffId }, updatedStaff);
        if (response.modifiedCount === 0) {
            res.status(404).json({ message: "Staff member not found" });
            return;
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE a staff member by ID
const deleteStaff = async (req, res) => {
    const staffId = new ObjectId(req.params.id);
    try {
        const response = await mongodb
            .getDatabase()
            .db(DATABASE)
            .collection(COLLECTION_NAME)
            .deleteOne({ _id: staffId });
        if (response.deletedCount === 0) {
            res.status(404).json({ message: "Staff member not found" });
            return;
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllStaff,
    getSingleStaff,
    createStaff,
    updateStaff,
    deleteStaff
};
