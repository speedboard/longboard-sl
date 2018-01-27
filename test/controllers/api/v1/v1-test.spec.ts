import {UserService} from '../../../../services/user.service';
import {Constants} from '../../../../models/constants';
import {closedDb} from '../../../../lib/db';
import * as request from 'supertest';
import * as express from 'express';
import * as path from 'path';
import {join} from 'lodash';
import {v4} from 'uuid';

const spec = require('../../../../lib/spec');
const kraken = require('kraken-js');

describe('Longboard API v1', function () {

    let app: any, mock: any;

    beforeEach(function (done) {

        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: path.join(__dirname, '../../../../'),
            onconfig: spec.onconfig
        }));

        mock = app.listen(1337);

    });

    afterEach(function () {
        return mock.close(() => {
            return closedDb();
        })
    });

    it('/GET v1', (done) => {
        request(mock).get('/api/v1')
            .set('Content-Type', 'application/json')
            .set('Authorization', join(['Bearer', UserService.generate({
                sub: v4(),
            })], Constants.EMPTY_STRING))
            .expect(200)
            .end((error: any) => {
                done(error);
            })
    });

    it('/GET v1 Not Acceptable', (done) => {
        request(mock).get('/api/v1')
            .set('Content-Type', 'text/html')
            .set('Accept-Language', 'pt-BR;en-US')
            .set('Authorization', join(['Bearer', UserService.generate({
                sub: v4()
            })], Constants.EMPTY_STRING))
            .expect(406)
            .end((error: any) => {
                done(error);
            })
    });

});
