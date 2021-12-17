import winston from 'winston';
import wDaily from 'winston-daily-rotate-file';
import dotenv from 'dotenv';
dotenv.config();

const dirName = process.env.LOG_DIR;
const { combine, timestamp, printf } = winston.format;

const logFormat = printf((info) => {
    if (info.message.constructor === Object) {
        info.message = JSON.stringify(info.message, null, 4);
    }
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat
    ),
    transports: [
        //info
        new wDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: dirName,
            filename: `%DATE%.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
        //error
        new wDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: dirName + '/error',
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});

if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'server') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        })
    );
}

const stream = {
    write: (message) => {
        logger.info({
            level: 'info',
            message: message,
        });
    },
};

export { logger, stream };
