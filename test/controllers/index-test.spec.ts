import {closedDb} from '../../lib/db';
import * as request from 'supertest';
import * as express from 'express';
import * as path from 'path';

const spec = require('../../lib/spec');
const kraken = require('kraken-js');

describe('Longboard', function () {

    let app: any, mock: any;

    beforeEach(function (done) {
        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: path.join(__dirname, '../../'),
            onconfig: spec.onconfig
        }));

        mock = app.listen(1337);
    });

    afterEach(function () {
        return mock.close(() => {
            return closedDb();
        })
    });

    it('/GET', (done) => {
        request(mock).get('/')
            .set('Content-Type', 'text/html')
            .set('Accept-Language', 'pt-BR;en-US')
            .expect(200)
            .end((error: any) => {
                done(error);
            })
    });

});
