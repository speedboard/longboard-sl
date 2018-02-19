node {

    stage("Checkout") {
        checkout(scm)
    }

    stage("Setup") {
        def dockerImage = docker.image("node:alpine") { b ->
        }
        dockerImage.inside() {
            sh('apk add --no-cache "su-exec>=0.2"')
            sh('apk add --update --no-cache openssl')
        }
    }

}
