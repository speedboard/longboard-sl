import {createServer} from 'oauth2orize';
import * as passport from 'passport';

export namespace oauth {

    // create OAuth 2.0 server
    export const server = createServer();

    /**
     * Token endpoint
     *
     * `token` middleware handles client requests to exchange authorization grants
     * for access tokens.  Based on the grant type being exchanged, the above
     * exchange middleware will be invoked to handle the request.  Clients must
     * authenticate when making requests to this endpoint.
     */
    export const authenticate = () => [
        passport.authenticate(['local', 'oauth2-client-password', 'refresh-token'], {
            session: false
        }),
        server.token(),
        server.errorHandler()
    ];

}
