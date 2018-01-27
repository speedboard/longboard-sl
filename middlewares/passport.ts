import {Strategy as ClientPasswordStrategy} from 'passport-oauth2-client-password';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import {UserService} from '../services/user.service';
import {Request, Response} from 'express';
import {Strategy} from 'passport-local';
import * as passport from 'passport';
import {publicKey} from '../lib/rsa';
import * as jwt from 'jsonwebtoken';
import {User} from '../models/user';
import {getDb} from '../lib/db';
import {v4} from 'uuid';

const CustomStrategy = require('passport-custom');

module.exports = function () {

    return function (req: Request | any, res: Response | any, next: any) {

        passport.use(new BearerStrategy(
            (token: any, done: any) => {
                jwt.verify(token, publicKey(), (error: any, decoded: any) => {
                    return done(null, decoded || false, error || {scope: 'read'});
                });
            }
        ));

        passport.use(new Strategy((username: string, password: string, done: any) => {
                return new UserService(getDb()).authenticate({
                    username: username,
                    password: password
                }).then((user: User) => {
                    return done(null, user);
                }).catch((error: any) => {
                    return done(error);
                });
            }
        ));

        /**
         * Client Password strategy
         *
         * The OAuth 2.0 client password authentication strategy authenticates clients
         * using a client ID and client secret. The strategy requires a verify callback,
         * which accepts those credentials and calls done providing a client.
         */
        passport.use(new ClientPasswordStrategy((clientId, clientSecret, done) => {
            done(null, UserService.generate({
                sub: v4()
            }));
        }));

        /**
         * A rfc {@link https://tools.ietf.org/html/rfc6749#page-47}
         * obriga na requisição o credencial do cliente quando o tipo for confidencial ex:
         * (Resource Owner Password Grant ou  Authorization Code Grant).
         * Aqui esta ignorando!
         */
        passport.use('refresh-token', new CustomStrategy(
            function (_req: Request, callback: any) {

                if (!req.body || (!req.body['refresh_token'])) {
                    return callback(null, false);
                }

                callback(null, {});

            }
        ));

        next();

    };

};
