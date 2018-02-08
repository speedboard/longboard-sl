#!/usr/bin/env groovy
pipeline {

    agent {
        docker {
            image 'node:alpine'
            args '-u root'
        }
    }

    stages {
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
