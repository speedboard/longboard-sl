import {NextFunction, Request, Response} from 'express';

module.exports = function () {
    return function (req: Request, res: Response, next: NextFunction) {
        res.status(404).send({
            error: {},
            message: 'Not found'
        });
    };
};
