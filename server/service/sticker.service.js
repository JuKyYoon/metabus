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
        const lat = gps.split(',')[0];
        const lon = gps.split(',')[1];
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
            await StickerDao.uploadSticker(stickerid, mobile, originalname, filename, lat, lon);
            const path = process.env.NODE_ENV == 'dev' ? process.env.DEVSERVER_DOMAIN : process.env.SERVER_DOMAIN;
            const result = path + '/api/sticker/' + filename;
            return result;
        } catch (err) {
            throw new handleError(500, err);
        }
    };

    static getStickerUsingGps = async (req) => {
        let { lat, lon } = req.query;
        if (lat == undefined || lon == undefined) {
            throw new handleError(500, 'Invalid Input');
        }
        lat = parseFloat(lat);
        lon = parseFloat(lon);
        if (lon > 180 || lat < -180 || lat > 90 || lat < -90) {
            throw new handleError(500, 'Invalid Input');
        }

        const result = await StickerDao.getStickerUsingGps(lat, lon);
        if (result[0].length == 0) {
            throw new handleError(404, 'Not Found');
        }
        return result[0];
    };
}
