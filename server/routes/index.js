import express from 'express';
const router = express.Router();

import user from './user.route.js';
import sticker from './sticker.route.js';

router.use('/user', user);
router.use('/sticker', sticker);

export default router;
