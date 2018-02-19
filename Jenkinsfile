node {
    checkout scm
    def dockerHome = docker.image('node:alpine').withRun('-u root')
    dockerHome.inside() {
        sh 'apk add --no-cache "su-exec>=0.2"'
        sh 'apk add --update --no-cache openssl'
    }
}
