import {ResourceBundle} from '../models/resource-bundle';
import {Collection} from 'mongodb';
import {Logger} from '../lib/logger';

export abstract class BaseService {

    private _logger: Logger;

    private _collection: Collection;

    private _resource: ResourceBundle;

    constructor(collection: Collection) {
        this._logger = new Logger();
        this._collection = collection;
        this._resource = new ResourceBundle('en-US');
    }

    get logger(): Logger {
        return this._logger;
    }

    get resource(): ResourceBundle {
        return this._resource;
    }

    get collection(): Collection {
        return this._collection;
    }

}
