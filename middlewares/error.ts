import {NextFunction, Request, Response} from 'express';
import {BusinessException} from '../errors/business-exception';
import {message} from '../lib/message';
import {Logger} from '../lib/logger';
import {format} from 'util';

const logger = new Logger();

module.exports = function () {

    return async function (error: any, req: Request, res: Response | any, next: NextFunction) {

        res.status(400)
            .header('Content-Message', await message('app_longboard_requisicao_error', 'pt-BR'))
            .header('Content-Version', await message('app_version', 'pt-BR'));

        logger.log('error', format(await message('app_longboard_error', 'pt-BR'), JSON.stringify(error)));

        if (error instanceof BusinessException) {
            res.status((<BusinessException>error).status || 400).send({
                status: (<BusinessException>error).status || 400,
                message: error.message
            });
        } else {
            res.status(500).send({
                error: res.app.kraken.get('env:production') ? error : {},
                message: await message('app_longboard_requisicao_error', 'pt-BR')
            });
        }

    }

};
