node {

    def dockerImage = docker.build("longboard:${env.BUILD_ID}")

    stage("Checkout") {
        checkout(scm)
    }

    stage("Setup") {
        dockerImage.inside() {
            sh('npm -v')
        }
    }
//
//    stage("Cert") {
//        dockerImage.inside() {
//            sh "openssl genrsa 4096 -aes256 > longboard.pem"
//            sh "openssl pkcs8 -topk8 -inform PEM -outform PEM -in longboard.pem -out longboard-private.pem -nocrypt"
//            sh "openssl rsa -in longboard-private.pem -pubout -outform PEM -out longboard-public.pem"
//        }
//    }
//
//    stage("Build") {
//        dockerImage.inside() {
//            sh "npm i"
//        }
//    }

}
