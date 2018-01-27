const message = require('./message')();
const database = require('./db')();
const rsa = require('./rsa')();

module.exports = {

    onconfig: (config: any, next: any) => {
        rsa(config.get('rsa'));
        message(config.get('i18n'));
        console.log(process.env.DATABASE_URL);
        console.log(process.env.DATABASE_NAME);
        database(process.env.DATABASE_URL, process.env.DATABASE_NAME).then(() => {
            next(null, config);
        });
    }

};
