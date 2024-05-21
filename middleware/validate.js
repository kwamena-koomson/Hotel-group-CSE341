const validator = require('../helpers/validate');

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

const staff = (req, res, next) => {
  const validationRule = {
  
    staff_id: 'required|integer',
    name: 'required|integer',
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

const clients = (req, res, next) => {
  let passValidation = true;
  const validationRule = {
    username: 'required|string',
    name: 'required|string',
    address: 'string',
    birthdate: 'datetime',
    email: 'string',
    active: 'boolean',
    hotelss: 'array'
  }

  req.body.hotelsIds.map(id => {
    passValidation = (typeof id === 'string' || myVar instanceof String) ?
      true : false;
  });
 


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
  clients, 
  staff
};