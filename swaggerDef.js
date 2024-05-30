const path = require('path');

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Your API Title',
    version: '1.0.0',
    description: 'Description of your API',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  apis: [
    path.resolve(__dirname, 'routes/hotelsRoutes.js'),
    path.resolve(__dirname, 'routes/staffRoutes.js'),
    // Add more route files as needed
  ],
};
