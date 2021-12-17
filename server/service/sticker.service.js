import dotenv from 'dotenv';
import handleError from '../model/error.js';
import StickerDao from '../dao/sticker.dao.js';
import crypto from 'crypto';

dotenv.config();
export default class StickerService {
    /**
     * Upload Image
     * @param {http.request} req
     * @returns {string} url
     */
    static uploadSticker = async (req) => {
        const { originalname, mimetype, filename, path, size } = req.file;
        const { mobile, gps } = req.query;
        if (originalname == undefined || mimetype == undefined || filename == undefined || path == undefined || size == undefined) {
            throw new handleError(500, 'Image Upload Fail');
        }
        try {
            /*
                {
                  fieldname: 'upload',
                  originalname: 'image (4).png',
                  encoding: '7bit',
                  mimetype: 'image/png',
                  destination: './upload',
                  filename: 'image (4).png',
                  path: 'upload/image (4).png',
                  size: 46894
                }
            */
            const stickerid = 'S' + new Date().valueOf() + crypto.randomBytes(3).toString('hex');
            await StickerDao.uploadSticker(stickerid, mobile, originalname, filename, gps);
            const path = process.env.NODE_ENV == 'dev' ? process.env.DEVSERVER_DOMAIN : process.env.SERVER_DOMAIN;
            const result = path + '/api/sticker/' + filename;
            return result;
        } catch (err) {
            throw new handleError(500, err);
        }
    };
}
