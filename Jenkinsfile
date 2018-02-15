#!/usr/bin/env groovy
pipeline {
    agent {
        docker {
            image 'node:alpine'
            args '-u root'
        }
    }
    environment {
        DATABASE_URL = 'mongodb://172.17.0.1:27017/speedboard'
        DATABASE_NAME = 'speedboard'
    }
    stages {
        stage('Setup') {
            steps {
                sh 'apk add --no-cache \'su-exec>=0.2\''
                sh 'apk add --update --no-cache openssl'
            }
        }
        stage('Cert') {
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
    post {
        always {
            cleanWs()
        }
    }
}
