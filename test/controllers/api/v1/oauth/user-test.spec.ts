import {User} from '../../../../../models/user';
import {closedDb} from '../../../../../lib/db';
import {isNullOrUndefined} from 'util';
import * as request from 'supertest';
import {Response} from 'superagent';
import * as express from 'express';
import * as path from 'path';
import v4 = require('uuid/v4');

const spec = require('../../../../../lib/spec');
const kraken = require('kraken-js');

describe('UserService API V1', function () {

    let app: any, mock: any;

    let user: User;

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

    it('/POST create user', (done) => {
        request(mock).post('/api/v1/users')
            .set('Content-Type', 'application/json')
            .set('Accept-Language', 'pt-BR;en-US')
            .set('Accept', 'application/json')
            .send(
                {
                    name: v4(),
                    surname: v4(),
                    login: v4(),
                    email: v4(),
                    password: v4(),
                    state: 1
                }
            )
            .expect(200)
            .expect('Content-Type', /json/)
            .end((error: any, res: Response) => {
                if (!isNullOrUndefined(res.body)) {
                    user = res.body;
                }
                done(error);
            });
    });

    it('/POST login with password', (done) => {
        request(mock).post('/api/v1/oauth/token')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(
                {
                    username: user.login,
                    password: user.password,
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
                    username: user.email,
                    password: user.email,
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
                    username: user.email,
                    password: '',
                    grant_type: 'password'
                }
            ).expect(400)
            .end((error: any) => {
                done(error);
            })
    });

});