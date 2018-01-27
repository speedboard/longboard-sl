import {format, isNullOrUndefined} from 'util';

const path = require('kraken-format-path');
const bundalo = require('bundalo');

let bundler: any;

module.exports = function () {
    return (i18n: { 'contentPath': string, 'fallback': string }) => {
        return bundler = bundalo({contentPath: i18n.contentPath, fallback: i18n.fallback, formatPath: path});
    };
};

module.exports.message = async (key: string, locality: string = 'pt-BR') => {
    return message(key, locality);
};

module.exports.content = async (locality: string = 'pt-BR') => {
    return content(locality);
};

async function message(key: string, locality: string = 'en-US') {
    return new Promise((resolve, reject) => {
        bundler.get({bundle: 'message', locality: locality}, (error: any, data: any) => {
            return isNullOrUndefined(data) ? reject(error) : resolve(format(data.content[key]));
        });
    })
}

async function content(locality: string = 'pt-BR') {
    return new Promise((resolve, reject) => {
        bundler.get({bundle: 'message', locality: locality}, (error: any, data: any) => {
            return isNullOrUndefined(data) ? reject(error) : resolve(data);
        });
    });
}

export {content as content, message as message}
