const router = require('express').Router();
import { serve, setup } from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

router.use('/api-docs', serve);
router.get('/api-docs', setup(swaggerDocument));