import dotenv from 'dotenv';
import UserDao from '../dao/user.dao.js';
import handleError from '../model/error.js';
dotenv.config();

/**
 * No SNS라고 되어있는 함수는 SNS 가입 계정은 이용하지 못한다.
 */
export default class UserService {
    static getUsers = async () => {
        const result = await UserDao.getUsers();
        if (result[0].length == 0) {
            throw new handleError(404, 'Users are not Exist');
        }
        return result[0];
    };

    static getUser = async (req) => {
        const { id } = req.params;
        const result = await UserDao.getUser(id);
        if (result[0].length == 0) {
            throw new handleError(404, 'User is not Exist');
        }
        return result[0];
    };

    static createUser = async (req) => {
        const { id } = req.body;
        const result = await UserDao.createUser(id);
        return result[0];
    };

    static authUser = async (req) => {
        const { id } = req.body;
        const result = await UserDao.auth(id);
        if (result[0].length == 0) {
            throw new handleError(401, 'Login FAIL');
        }
        return result[0];
    };
}
