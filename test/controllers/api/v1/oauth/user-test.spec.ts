import {closedDb} from '../../../../../lib/db';
import * as request from 'supertest';
import * as express from 'express';
import * as path from 'path';

const spec = require('../../../../../lib/spec');
const kraken = require('kraken-js');

describe('UserService API V1', function () {

    let app: any, mock: any;

    beforeEach(function (done) {

        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: path.join(__dirname, '../../../../../'),
            onconfig: spec.onconfig
        }));

        mock = app.listen(1337);

    });

    afterEach(function () {
        return mock.close(() => {
            return closedDb();
        })
    });

    it('/POST login with password', (done) => {
        request(mock).post('/api/v1/oauth/token')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(
                {
                    username: 'ismael.queiroz',
                    password: '123456',
                    grant_type: 'password'
                }
            ).expect(200)
            .end((error: any) => {
                done(error);
            })
    });

    it('/POST login with password invalid', (done) => {
        request(mock).post('/api/v1/oauth/token')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(
                {
                    username: 'ismaelqueiroz',
                    password: '123456',
                    grant_type: 'password'
                }
            ).expect(401)
            .end((error: any) => {
                done(error);
            })
    });

    it('/POST login without password', (done) => {
        request(mock).post('/api/v1/oauth/token')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(
                {
                    username: 'ismaelqueiroz',
                    password: '',
                    grant_type: 'password'
                }
            ).expect(400)
            .end((error: any) => {
                done(error);
            })
    });

});

