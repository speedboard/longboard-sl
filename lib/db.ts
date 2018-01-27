import {Db, MongoClient, MongoError} from 'mongodb';
import {Environment} from '../models/environment';
import * as querystring from 'querystring';
import {isNullOrUndefined} from 'util';
import {Logger} from './logger';

const logger: Logger = new Logger({level: 'debug'});

let session: {
    client: MongoClient,
    db: Db
};

function getDb(): Db {
    return session.db;
}

function closedDb(): void {
    if (!isNullOrUndefined(session) && !isNullOrUndefined(session.client)) {
        session.client.close((error: MongoError) => {
            if (isNullOrUndefined(error)) {
                logger.log('debug', 'The connection closed database!');
            }
        });
    }
}

async function configureDb(environment: Environment | string, database: string) {

    logger.log('debug', 'Connected to the database');

    if (typeof environment === 'string') {
        return connectDb(environment.toString(), database);
    }

    const options = querystring.stringify(environment.options);

    let url = 'mongodb://'.concat(
        encodeURIComponent(environment.user), ':',
        encodeURIComponent(environment.password), '@',
        environment.hosts.join(',')
    );

    if (options) {
        url = url.concat('?', options);
    }

    return connectDb(url, environment.datasource, environment.loggerLevel);

}

async function connectDb(url: string, database: string, loggerLevel?: string) {
    return MongoClient.connect(url, {
        loggerLevel: loggerLevel
    }).then((client: MongoClient) => {

        logger.log('debug', 'Database successfully connected!');

        session = {
            client: client,
            db: client.db(database)
        };

        return session;

    });
}

module.exports = function () {
    return (environment: Environment | string, database: string) => {
        return configureDb(environment, database);
    }
};

module.exports.getDb = function () {
    return getDb();
};

module.exports.closedDb = function () {
    return closedDb();
};

export {closedDb as closedDb, getDb as getDb};

