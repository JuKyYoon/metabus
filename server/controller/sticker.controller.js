import path from 'path';
import ImageService from '../service/sticker.service.js';
import response from '../model/response.js';

export default class StickerController {
    /**
     * Upload a File
     */
    static uploadSticker = async (req, res, next) => {
        try {
            const url = await ImageService.uploadSticker(req);
            return res.status(201).json(new response(201, 'success', url));
        } catch (err) {
            next(err);
        }
    };

    /**
     * Get a File
     */
    static getSticker = async (req, res, next) => {
        try {
            const name = req.params.filename;
            const filepath = process.env.NODE_ENV == 'dev' ? path.resolve('upload/' + name) : '/app/upload/' + name;
            return res.sendFile(filepath);
        } catch (err) {
            next(err);
        }
    };
}
