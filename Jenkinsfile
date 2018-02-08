#!/usr/bin/env groovy
node {
    stages "Prepare environment"
    checkout scm
    docker.image("node:alpine").inside {
        stages {
            stage('Build') {
                steps { sh 'npm i' }
            }
            stage('Test') {
                steps { sh 'npm test' }
            }
        }
    }
}
//pipeline {
//    agent {
//        docker { image 'node:alpine' }
//    }
//    stages {
//        stage('Build') {
//            steps { sh 'npm i' }
//        }
//        stage('Test') {
//            steps { sh 'npm test' }
//        }
//    }
//}
