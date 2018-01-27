import {LoggerInstance, LoggerOptions} from 'winston';
import {NextFunction} from 'express-serve-static-core';
import {template, TemplateExecutor} from 'lodash';
import {Request, Response} from 'express';
import {isNullOrUndefined} from 'util';
import * as moment from 'moment';

const winston = require('winston');

const config = winston.config;

export class Logger {

    private logger: LoggerInstance;

    constructor(partial?: Partial<LoggerOptions>) {

        const options: LoggerOptions = {
            level: 'debug',
            exitOnError: false,
            colors: {
                silly: 'magenta',
                verbose: 'cyan',
                debug: 'blue',
                error: 'red',
                data: 'grey',
                warn: 'yellow',
                info: 'green'
            },
            transports: [new winston.transports.Console({
                colorize: true,
                timestamp: true,
                showLevel: true,
                formatter: (options: any) => {
                    return moment(new Date(), 'YYYY-MM-DD\'T\'HH:mm:ssZZ').toJSON() + ' ' +
                        config.colorize(options.level, options.level.toUpperCase()) + ' ' +
                        (options.message ? options.message : '') +
                        (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
                }
            })]
        };

        if (!isNullOrUndefined(partial)) {
            Object.assign(options, partial);
        }

        this.logger = new winston.Logger(options);

    }

    log(level: string, message: string, ...meta: any[]) {
        this.logger.log(level, message, meta);
    }

}

export function audit(options?: LoggerOptions) {

    const logger: Logger = new Logger(options);

    return function (request: Request, response: Response, next: NextFunction) {

        const message = 'User[{{request.user.sub}}] requested access to the service [{{request.method}} {{request.originalUrl}}]]';

        const templateExecutor: TemplateExecutor = template(message, {
            interpolate: /{{(.+?)}}/g
        });

        logger.log('info', templateExecutor({request: request, response: response}));

        next();

    };

}

