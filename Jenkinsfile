node('testing') {
    machine()
    checkout()
    build()
    test()
}

def machine() {
    agent {
        docker { image 'node:alpine' }
    }
}

def checkout() {
    stage("Checkout") {
        checkout scm
    }
}

def build() {
    stage('Build') {
        steps {
            sh 'npm i'
        }
    }
}

def test() {
    stage('Test') {
        steps {
            env.NODE_ENV = "test"
            print "Environment will be : ${env.NODE_ENV}" as java.lang.Object
            sh 'npm test'
        }
    }
}
