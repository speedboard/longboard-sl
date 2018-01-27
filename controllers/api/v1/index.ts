import {ResourceBundle} from '../../../models/resource-bundle';
import {Request, Response, Router} from 'express';
import {accepts} from '../../../lib/accepts';
import {audit} from '../../../lib/logger';
import * as passport from 'passport';

module.exports = function (router: Router) {

    router.get('/', accepts('application/json'), passport.authenticate('bearer', {
        session: false
    }), audit(), async (req: Request | any, res: Response) => {

        const bundle = await req.bundle;

        res.status(200)
            .header('Content-Type', 'application/json')
            .header('Content-Version', bundle.content['app_version'])
            .header('Content-Message', bundle.content['app_name'])
            .send({message: await new ResourceBundle().message('app_name')});

    });

};
