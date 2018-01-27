import {message} from '../lib/message';
import {format} from 'util';

export class ResourceBundle {

    private _locality: string;

    constructor(locality: string = 'en-US') {
        this.locality = locality;
    }

    async message(key: string, ...params: Array<any>): Promise<string> {
        return format(await message(key, this.locality), params);
    }

    get locality(): string {
        return this._locality;
    }

    set locality(value: string) {
        this._locality = value;
    }

}
