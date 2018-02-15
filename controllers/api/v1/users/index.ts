import {NextFunction, Request, Response, Router} from 'express';
import {UserService} from '../../../../services/user.service';
import {getDb} from '../../../../lib/db';
import {User} from '../../../../models/user';

module.exports = function (router: Router) {

    router.post('/', (req: Request, res: Response, next: NextFunction) => {

        new UserService(getDb()).create(req.body).then((user: User) => {
            res.status(200)
                .header('Content-Type', 'application/json')
                .header('Content-Version', 'v1')
                .send(user);
        }).catch((error: any) => {
            next(error);
        });

    });

};
