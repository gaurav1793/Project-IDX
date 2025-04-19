import express from 'express'
import { getProjectTreeController, projectControllers } from '../../controllers/projectControllers.js';

const router = express.Router();


router.post('/',projectControllers);
router.get('/:projectId',getProjectTreeController);

export default router;