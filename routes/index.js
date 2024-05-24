const router = require('express').Router();
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Routes for different collections
router.use('/hotels', require('./hotels'));
router.use('/staff', require('./staff'));
router.use('/clients', require('./clients'));
router.use('/bookings', require('./bookings')); // Assuming bookings is the additional collection

// Swagger API documentation setup
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// GitHub OAuth login route
router.get('/login', passport.authenticate('github'), (req, res) => {
  // This route redirects to GitHub OAuth login page
});

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
