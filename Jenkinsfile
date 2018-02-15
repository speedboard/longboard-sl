#!/usr/bin/env groovy
node {
    environment {
        DATABASE_URL = 'mongodb://db:27017/speedboard'
        DATABASE_NAME = 'speedboard'
    }
    docker.image('node:mongo') { m ->
        docker.image('node:alpine').inside("--link ${m.id}:db") {
            sh 'mongo --host db speedboard --eval \'db.createUser({user:"speedboard", pwd:"speedboard", roles:["readWrite"]});\''
            sh 'mongo --host db speedboard --eval \'db.users.insert({ "email":"eu@iqueiroz.com.br", "login":"ismael.queiroz", "password":"123456", "name":"Ismael", "surname":"Queiroz", "roles":["app:dashboard"], "state":1, "created":"2017-10-17T13:23:44.804-0300"});\''
            sh 'openssl genrsa 4096 -aes256 > longboard.pem'
            sh 'openssl pkcs8 -topk8 -inform PEM -outform PEM -in longboard.pem -out longboard-private.pem -nocrypt'
            sh 'openssl rsa -in longboard-private.pem -pubout -outform PEM -out longboard-public.pem'
            sh 'npm i'
            sh 'npm test'
        }
    }
}
