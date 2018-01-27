import {BusinessException} from '../errors/business-exception';
import {NextFunction, Request, Response} from 'express';

export function accepts(...types: string[]) {

    return function (req: Request, res: Response, next: NextFunction) {

        if (!typeis(req, types)) {
            return next(new BusinessException('Not Acceptable', 406));
        }

        next();

    };

    function typeis(req: Request, _types: string[]) {

        for (const _type of _types) {
            const accept = req.headers['content-type'] === _type;
            if (accept) {
                return accept;
            }
        }

        return false;

    }

}
