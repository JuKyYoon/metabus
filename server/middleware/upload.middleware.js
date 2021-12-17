import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();
/**
 * 이미지 업로드에 사용되는 Multer 모듈이다.
 * 해당 미들웨어를 거쳐 성공적으로 이미지가 업로드되었다면, 이미지 정보를 다음 컨트롤러로 JSON형식으로 넘겨준다.
 */
const uploadMiddleware = multer(
    {
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, process.env.UPLOAD_DIR);
            },
            filename: function (req, file, cb) {
                cb(null, new Date().valueOf() + '_' + file.originalname);
            },
            fileFilter: function (req, file, cb) {
                cb(null, true);
            },
            limits: {
                fileSize: 17000000,
            },
        }),
    },
    'NONE'
);

export default uploadMiddleware;
