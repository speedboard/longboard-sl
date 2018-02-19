node {
    checkout scm
    docker.image('node:alpine').withRun('-u root') { n ->
        sh 'apk add --no-cache "su-exec>=0.2"'
        sh 'apk add --update --no-cache openssl'
    }
}
