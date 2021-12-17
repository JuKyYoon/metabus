import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const config = {
    host: process.env.SESSION_DB_HOST,
    port: process.env.SESSION_DB_PORT,
    user: process.env.SESSION_DB_USER,
    password: process.env.SESSION_DB_PW,
    database: process.env.SESSION_DB_NAME,
    connectionLimit: 30,
    multipleStatements: true,
};
class Pool {
    constructor(dbConfig) {
        this.pool = mysql.createPool(dbConfig);
    }

    getPool() {
        return this.pool;
    }
}

const pool = new Pool(config);
const dbPool = pool.getPool();
export default dbPool;
