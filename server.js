const express = require('express');
const bodyParser = require('body-parser');
const { initDb } = require('./database/database');
const hotelsRoutes = require('./routes/hotelsRoutes');
const staffRoutes = require('./routes/staffRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Add this route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Hotel Management API');
});

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/hotels', hotelsRoutes);
app.use('/api/staff', staffRoutes);

initDb((err) => {
    if (err) {
        console.error('Failed to connect to MongoDB', err);
    } else {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
});

