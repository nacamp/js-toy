const winston = require('winston');

const {
  combine, timestamp, printf, colorize,
} = winston.format;

const errorStackFormat = winston.format((info) => {
  if (info.stack) {
    return { ...info, message: `${info.message} \n ${info.stack}` };
  }
  return info;
});

const myFormat = printf(({
  // eslint-disable-next-line no-shadow
  level, message, timestamp,
}) => `${timestamp} ${level}: ${message}`);

// eslint-disable-next-line new-cap
const logger = new winston.createLogger({
  format: combine(
    errorStackFormat(),
    colorize(),
    timestamp(),
    myFormat,
  ),
  colorize: true,
  transports: [
    new winston.transports.Console(),
  ],
  exitOnError: false,
});
logger.info('info...', { message: 'another message' });
logger.log({ level: 'info', message: JSON.stringify({ x: 111, y: 222 }) });
logger.error('err', new Error('xxxx'));
