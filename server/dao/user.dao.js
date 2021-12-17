import executeQuery from '../database/execute.js';
import dbPool from '../database/index.js';
export default class UserDao {
    static getUsers = async () => {
        const query_string = `SELECT mobileid, create_date FROM USERS`;
        var result = await executeQuery(dbPool, query_string);
        return result;
    };

    static getUser = async (mobile) => {
        const query_string = `SELECT mobileid, create_date FROM USERS WHERE mobileid = '${mobile}'`;
        var result = await executeQuery(dbPool, query_string);
        return result;
    };

    static createUser = async (mobile) => {
        const query_string = `INSERT INTO USERS (mobileid) VALUES ('${mobile}')`;
        var result = await executeQuery(dbPool, query_string);
        return result;
    };

    static auth = async (mobile) => {
        const query_string = `SELECT * FROM USERS WHERE mobileid = '${mobile}'`;
        var result = await executeQuery(dbPool, query_string);
        return result;
    };
}
