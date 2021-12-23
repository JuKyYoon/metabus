import express from 'express';
import uploadMiddleware from '../middleware/upload.middleware.js';
import StickerController from '../controller/sticker.controller.js';
const router = express.Router();

/**
 * Upload a Single Image
 * @param {String} filelink 파일경로 : '연도'
 * @uploadMiddleware
 */
router.post('/upload', uploadMiddleware.single('sticker'), StickerController.uploadSticker);
router.get('/', StickerController.getStickerUsingGps);

router.get('/:filename', StickerController.getSticker);

// router.get('/', function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
//     res.end(
//         '<h3>1. Single File Upload</h3><form action="sticker/upload?mobile=01012341234&gps=37.5404632,127.0513333" enctype="multipart/form-data" method="post"><input type="file" name="sticker"><button type="submit" class="btn btn-primary">Upload</button></form><hr>'
//     );
// });

export default router;
