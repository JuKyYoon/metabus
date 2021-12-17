import dbPool from '../database/index.js';
import executeQuery from '../database/execute.js';
export default class StickerDao {
    /**
     * 스티커 업로드 
     */
    static uploadSticker = async (stickerid, mobile, originname, filename, gps) => {
        const query_string = `INSERT INTO STICKER (stickerid, mobileid, originname, filename, gps) 
            VALUES ("${stickerid}", "${mobile}",  "${originname}", "${filename}", "${gps}")`;
        const result = await executeQuery(dbPool, query_string);
        return result;
    };

}
