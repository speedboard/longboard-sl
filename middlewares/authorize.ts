import {exchange, ExchangeDoneFunction} from 'oauth2orize';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {oauth} from '../lib/oauth';

module.exports = function () {

    /**
     * Exchange user id and password for access tokens.
     *
     * The callback accepts the `client`, which is exchanging the user's name and password
     * from the token request for verification. If these elements are validated, the
     * application issues an access token on behalf of the user who authorized the code.
     */
    oauth.server.exchange(exchange.password((user: User, username: string, password: string, done: ExchangeDoneFunction) => {
        done(null, UserService.generate({
            sub: user.login,
            mail: user.email,
            name: user.name,
            surname: user.surname
        }))
    }));

};
