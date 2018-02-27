import {BusinessErrorException} from '../errors/business-error-exception';
import {Credential} from '../models/credential';
import {sign, SignOptions} from 'jsonwebtoken';
import {BaseService} from './base.service';
import {Payload} from '../models/payload';
import {format, isNullOrUndefined} from 'util';
import {privateKey} from '../lib/rsa';
import {User} from '../models/user';
import {Db, InsertOneWriteOpResult} from 'mongodb';

export class UserService extends BaseService {

    private static COLLECTION_NAME = 'users';

    constructor(private db: Db) {
        super(db.collection(UserService.COLLECTION_NAME));
    }

    async create(user: User): Promise<User> {

        this.logger.log('info', await this.resource.message('app_validating_user_credentials', user));

        return this.collection.insertOne(user).then(async (result: InsertOneWriteOpResult) => {

            if (isNullOrUndefined(result)) {
                throw new BusinessErrorException(await this.resource.message('app_could_not_validate_credentials'), 401);
            }

            return this.collection.findOne({
                '_id': result.insertedId
            });

        });

    }

    async authenticate(credential: Credential): Promise<User> {

        // if (isNullOrUndefined(credential) || isNullOrUndefined(credential.username) || isNullOrUndefined(credential.password)) {
        //     return Promise.reject(new BusinessException(await this.resource.message('app_could_not_validate_credentials'), 401));
        // }

        this.logger.log('info', format(await this.resource.message('app_validating_user_credentials'), credential));

        return this.collection.findOne({'login': credential.username, 'state': 1}, {
            sort: {created: -1}, limit: 1
        }).then(async (user: User) => {

            if (isNullOrUndefined(user)) {
                throw new BusinessErrorException(await this.resource.message('app_could_not_validate_credentials'), 401);
            }

            return user;

        });

    }

    /**
     * Generate jwt token and refresh token using RS256
     * @param {Payload} payload
     * @param {SignOptions} options
     * @returns {string}
     */
    public static generate(payload: Payload, options?: SignOptions): string {
        return sign(
            payload,
            privateKey(),
            Object.assign({}, options, {
                algorithm: 'RS256',
                expiresIn: 7776000
            })
        )
    };

}
