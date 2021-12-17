import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import http from 'http';
import { logger, stream } from './util/winston.js';
import indexRouter from './routes/index.js';

const app = express();
const port = process.env.PORT || 8080;
const __dirname = path.resolve();
const corsURL = process.env.NODE_ENV == 'dev' ? process.env.DEVWEB_DOMAIN : process.env.WEB_DOMAIN;

global.logger = logger;
dotenv.config();

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));

app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', corsURL);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    // res.header('Access-Control-Expose-Headers', 'Content-Range');
    // res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    next();
});

app.set('jwt-secret', 'my-secret');
app.use(morgan('dev', { stream }));

// route & logger
app.use('/api', indexRouter);
app.get('/favicon.ico', (req, res) => res.status(204)); // 이중 로그 방지.

app.use(function (err, req, res, next) {
    logger.error(err.message);
    logger.error(err.stack);
    if (err.code == 'ENOENT') {
        res.set('Content-Type', 'text/html');
        return res.send(404, 'Not Found'); // 파일 경로 감추기.
        // res.sendFile(path.join(__dirname, '.', 'error.html'));
    } else {
        return res.status(err.statusCode || 500).json({
            statusCode: err.statusCode,
            status: 'Error',
            message: err.message,
        });
    }
});
var server = http.createServer(app);

server.listen(port, '0.0.0.0');
server.on('error', (err) => {
    console.error(err);
});

server.on('listening', () => {
    logger.info(`express is running on ${port}`);
});

export default app;
