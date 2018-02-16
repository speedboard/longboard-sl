const message = require('./message')();
const database = require('./db')();
const rsa = require('./rsa')();

module.exports = {

    onconfig: (config: any, next: any) => {
        rsa(config.get('rsa'));
        message(config.get('i18n'));
        console.log(process.env.DATABASE_URL);
        console.log(process.env.DATABASE_NAME);
        database(process.env.DATABASE_URL || 'mongodb://172.17.0.1:27017/speedboard',
            process.env.DATABASE_NAME || 'speedboard').then(() => {
            next(null, config);
        }).catch((error: any) => {
            next(error, config);
        });
    }

};
