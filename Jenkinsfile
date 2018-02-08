#!/usr/bin/env groov
pipeline {

    agent {
        docker {
            image 'node:alpine'
        }
    }

    stages {
        stage("Checkout") {
            checkout scm
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
//node('testing') {
//    machine()
//    checkout()
//    build()
//    test()
//}
//
//def machine() {
//    agent {
//        docker { image 'node:alpine' }
//    }
//}
//
//def checkout() {
//    stage("Checkout") {
//        checkout scm
//    }
//}
//
//def build() {
//    stage('Build') {
//        steps {
//            sh 'npm i'
//        }
//    }
//}
//
//def test() {
//    stage('Test') {
//        steps {
//            env.NODE_ENV = "test"
//            print "Environment will be : ${env.NODE_ENV}" as java.lang.Object
//            sh 'npm test'
//        }
//    }
//}
