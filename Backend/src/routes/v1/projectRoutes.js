import express from 'express'
import { projectControllers } from '../../controllers/projectControllers.js';

const router = express.Router();


router.post('/',projectControllers);


export default router;