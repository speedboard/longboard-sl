import {readFileSync} from 'fs';
import {isNullOrUndefined} from 'util';

let keys: any;

module.exports = function () {
    return (options: { privateKey: string, publicKey: string }) => {
        return keys = {
            privateKey: readFileSync(isNullOrUndefined(options) ? 'longboard-private.pem' : options.privateKey),
            publicKey: readFileSync(isNullOrUndefined(options) ? 'longboard-public.pem' : options.publicKey)
        };
    };
};

module.exports.privateKey = function () {
    return privateKey();
};

module.exports.publicKey = function () {
    return publicKey();
};

export function privateKey() {
    return keys.privateKey;
}

export function publicKey() {
    return keys.publicKey;
}
