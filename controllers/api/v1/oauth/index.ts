import {Router} from 'express';
import {accepts} from '../../../../lib/accepts';
import {audit} from '../../../../lib/logger';
import {oauth} from '../../../../lib/oauth';

module.exports = function (router: Router) {

    router.post('/token', accepts('application/x-www-form-urlencoded'), oauth.authenticate(), audit());

};
