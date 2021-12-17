import response from '../model/response.js';
import UserService from '../service/user.service.js';

export default class UserController {
    static getUsers = async (req, res, next) => {
        try {
            const result = await UserService.getUsers();
            return res.status(201).json(new response(201, 'success', 'Find ALL USERS', result));
        } catch (err) {
            next(err);
        }
    };

    static getUser = async (req, res, next) => {
        try {
            const result = await UserService.getUser(req);
            return res.status(201).json(new response(201, 'success', 'Find a USER', result));
        } catch (err) {
            next(err);
        }
    };

    static createUser = async (req, res, next) => {
        try {
            const result = await UserService.createUser(req);
            return res.status(201).json(new response(201, 'success', 'CREATE a USER', result));
        } catch (err) {
            next(err);
        }
    };

    static authUser = async (req, res, next) => {
        try {
            const result = await UserService.authUser(req);
            return res.status(201).json(new response(201, 'success', 'LOGIN SUCCESS', result));
        } catch (err) {
            next(err);
        }
    };
}
