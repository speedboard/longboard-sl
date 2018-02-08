#!/usr/bin/env groovy
pipeline {
    agent {
        docker {
            image 'node:alpine'
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
