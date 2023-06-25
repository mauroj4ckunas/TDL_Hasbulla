import express from 'express';
import { postLogin, getLogin } from '../controllers/loginController';

const router = express.Router();

router.post('/', postLogin);
router.get('/', getLogin);

export default router;
