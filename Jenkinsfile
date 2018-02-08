node('testing') {
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