#!/usr/bin/env groovy
pipeline {
    stage('Services') {
        agent {
            docker {
                image 'node:mongo'
            }
        }
        steps {
            sh 'mongo speedboard --eval \'db.createUser({user:"speedboard", pwd:"speedboard", roles:["readWrite"]});\''
            sh 'mongo speedboard --eval \'db.users.insert({ "email":"eu@iqueiroz.com.br", "login":"ismael.queiroz", "password":"123456", "name":"Ismael", "surname":"Queiroz", "roles":["app:dashboard"], "state":1, "created":"2017-10-17T13:23:44.804-0300"});\''
        }
    }
    agent {
        docker {
            image 'node:alpine'
        }
    }
    stages {
        stage('Setup') {
            steps {
                sh 'openssl genrsa 4096 -aes256 > longboard.pem'
                sh 'openssl pkcs8 -topk8 -inform PEM -outform PEM -in longboard.pem -out longboard-private.pem -nocrypt'
                sh 'openssl rsa -in longboard-private.pem -pubout -outform PEM -out longboard-public.pem'
            }
        }
        stage('Build') {
            steps {
                sh 'npm i'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}
