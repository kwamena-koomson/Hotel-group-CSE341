const Validator = require('validatorjs');

// Helper function to validate request body
const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

// Middleware function to validate hotels data
const hotels = (req, res, next) => {
  const validationRule = {
    hotels_id: 'required|integer',
    rooms: 'required|integer',
    type: 'array'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// Middleware function to validate staff data
const staff = (req, res, next) => {
  const validationRule = {
    staff_id: 'required|integer',
    name: 'required|string',
    position: 'array',
    role: 'array'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// Middleware function to validate clients data
const clients = (req, res, next) => {
  const validationRule = {
    username: 'required|string',
    name: 'required|string',
    address: 'string',
    birthdate: 'date',
    email: 'email',
    active: 'boolean',
    hotelss: 'array'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// Middleware function to validate bookings data
const bookings = (req, res, next) => {
  const validationRule = {
    booking_id: 'required|integer',
    client_id: 'required|integer',
    hotel_id: 'required|integer',
    room_number: 'required|string',
    check_in_date: 'required|date',
    check_out_date: 'required|date',
    status: 'required|string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  hotels,
  staff,
  clients,
  bookings
};
