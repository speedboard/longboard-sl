import {Request, Response, Router} from 'express';
import {message} from '../lib/message';

module.exports = function (router: Router) {

    router.get('/', async (req: Request | any, res: Response) => {

        const bundle = await req.bundle;

        res.status(200)
            .header('Content-Type', 'text/html')
            .header('Content-Version', bundle.content['app_version'])
            .header('Content-Message', bundle.content['app_name'])
            .send(await message('app_name', 'pt-BR'));

    });

};
