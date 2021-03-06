import {BusinessException} from '../errors/business-exception';
import {Db, MongoClient, MongoError} from 'mongodb';
import {format, isNullOrUndefined} from 'util';
import {message} from './message';
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

async function configureDb(environment: string, database: string) {

    logger.log('debug', format('Connected to the database'));

    if (isNullOrUndefined(environment)) {
        throw new BusinessException(<string>await message('app_could_not_validate_credentials'), 500);
    }

    return connectDb(environment.toString(), database);

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
    return (environment: string, database: string) => {
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

