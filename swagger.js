const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Middleware and route setup
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define your routes
const hotelsRoutes = require('./routes/hotelsRoutes');
const staffRoutes = require('./routes/staffRoutes');

app.use('/api/hotels', hotelsRoutes);
app.use('/api/staff', staffRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
