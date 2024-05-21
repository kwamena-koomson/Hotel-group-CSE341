const validator = require('../helpers/validate');

const account = (req, res, next) => {
  const validationRule = {
  
    account_id: 'required|integer',
    limit: 'required|integer',
    products: 'array'
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

const customer = (req, res, next) => {
  let passValidation = true;
  const validationRule = {
    username: 'required|string',
    name: 'required|string',
    address: 'string',
    birthdate: 'datetime',
    email: 'string',
    active: 'boolean',
    accounts: 'array'
  }

  req.body.accountIds.map(id => {
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
  account,
  customer
};