import 'reflect-metadata';
import {Logger} from './lib/logger';
import * as express from 'express';
import * as http from 'http';
import {Server} from 'http';
import {format} from 'util';

const kraken = require('kraken-js');
const options = require('./lib/spec');
const compression = require('compression');

const logger: Logger = new Logger();

const app: any = module.exports = express();

app.use(kraken(options))
    .use(compression());

app.on('start', function () {
    logger.log('info', 'Application ready to serve requests.');
    logger.log('info', 'Environment: %s', app.kraken.get('env:env'));
});

const port: string = process.env.PORT || '8000';

const server: Server = http.createServer(app);

server.listen(port, () => {
    logger.log('info', 'Server listening on http://localhost:%d', port);
});

//error handling code within middleware
process.on('uncaughtException', function (error: any) {
    logger.log('error', format('uncaughtException: %s', error.message));
});

if (process.env.NODE_ENV === 'test') {
    module.exports = app;
}
