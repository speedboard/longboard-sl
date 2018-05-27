const message = require('./message')();
const database = require('./db')();
const rsa = require('./rsa')();

module.exports = {

    onconfig: (config: any, next: any) => {
        rsa({
            privateKey: process.env.RSA_PRIVATE_KEY || 'longboard-private.pem',
            publicKey: process.env.RSA_PUBLIC_KEY || 'longboard-public.pem'
        });
        message(config.get('i18n'));
        database(process.env.DATABASE_URL || 'mongodb://localhost:27017/speedboard',
            process.env.DATABASE_NAME || 'speedboard').then(() => {
            next(null, config);
        }).catch((error: any) => {
            next(error, config);
        });
    }

};