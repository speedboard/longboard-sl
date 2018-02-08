#!/usr/bin/env groovy
pipeline {
    stages {
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
