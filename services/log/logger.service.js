const winston = require('winston');
const path = require('path');

class LoggerService {
    constructor(route){
        this.route = route;
        this.logger = winston.createLogger({
            format:winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf(({ timestamp, level, message, obj }) => {
                    let msg = `[${timestamp}] | ${level} |: ${message} `;
                    return obj ? `${msg} | data: ${JSON.stringify(obj)}` : msg;
                })
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({filename: path.join(__dirname,'logFiles',`${route}.log`)})
            ]
        });
    }
    
    log(level, message, obj = null, modelName = '') {
        this.logger.log({ level, message: `${modelName} - ${message}`, obj });
    }

    info(message, obj, modelName) { this.log('info', message, obj, modelName); }
    debug(message, obj, modelName) { this.log('debug', message, obj, modelName); }
    error(message, obj, modelName) { this.log('error', message, obj, modelName); }
    warn(message, obj, modelName) { this.log('warn', message, obj, modelName); }
}

module.exports = LoggerService;