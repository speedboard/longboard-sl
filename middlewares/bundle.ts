import {Request, Response} from 'express';
import {content} from '../lib/message';

module.exports = function () {

    return function (req: Request | any, res: Response | any, next: any) {

        let locality = 'pt-BR';

        if (req.headers['accept-language'] && req.headers['accept-language'].match(/([\w]+-[A-Z]+)/g)) {
            locality = req.headers['accept-language'].match(/([\w]+-[A-Z]+)/g)[0];
        }

        req.bundle = content(locality);

        next();

    };

};
