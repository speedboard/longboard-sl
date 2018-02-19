node {

    stage("Checkout") {
        checkout(scm)
    }

    stage("Setup") {
        docker.image("node:alpine").inside() {
            sh('apk add -U openssl')
        }
    }

}
