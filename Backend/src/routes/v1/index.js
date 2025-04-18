import express from 'express'

import projectRoutes from './projectRoutes.js'
import {ping} from '../../controllers/pingController.js'

const router = express.Router();

router.get('/ping',ping);

router.use('/project',projectRoutes);

export default router;