import dbPool from '../database/index.js';
import executeQuery from '../database/execute.js';
export default class StickerDao {
    /**
     * 스티커 업로드
     */
    static uploadSticker = async (stickerid, mobile, originname, filename, lat, lon) => {
        const query_string = `INSERT INTO STICKER (stickerid, mobileid, originname, filename, lat, lon) 
            VALUES ("${stickerid}", "${mobile}",  "${originname}", "${filename}", ${lat}, ${lon})`;
        const result = await executeQuery(dbPool, query_string);
        return result;
    };

    static getStickerUsingGps = async (lat, lon) => {
        const query_string = `SELECT *, ST_DISTANCE_SPHERE(POINT(${lon}, ${lat}), POINT(lon, lat)) AS dist FROM STICKER ORDER BY dist`;
        const result = await executeQuery(dbPool, query_string);
        return result;
    };
}
