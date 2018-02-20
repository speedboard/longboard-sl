node {

    def dockerImage = docker.build("longboard:${env.BUILD_ID}")

    stage("Checkout") {
        checkout(scm)
    }

    dockerImage.inside() {

        environment {
            COVERALLS_REPO_TOKEN = "oo4QtcamdeOkH2aijnDfFjeyS79CQHLnC"
            DATABASE_URL = "mongodb://172.17.0.1:27017/speedboard"
            DATABASE_NAME = "speedboard"
            CI = true
        }

        stage("Setup") {
            steps {
                sh "npm -v"
            }
        }

        stage("Generate Cert") {
            steps {
                sh "openssl genrsa 4096 -aes256 > longboard.pem"
                sh "openssl pkcs8 -topk8 -inform PEM -outform PEM -in longboard.pem -out longboard-private.pem -nocrypt"
                sh "openssl rsa -in longboard-private.pem -pubout -outform PEM -out longboard-public.pem"
            }
        }

        stage("Install dependencies") {
            steps {
                sh "npm i"
            }
        }

        stage("Test") {
            steps {
                sh "npm test"
            }
        }

        stage("Code coverage") {
            steps {
                sh "npm run coverage"
            }
            post {
                success {
                    publishHTML target: [
                        allowMissing         : false,
                        alwaysLinkToLastBuild: false,
                        keepAll              : true,
                        reportDir            : "coverage",
                        reportFiles          : "index.html",
                        reportName           : "RCov Report",
                        reportTitles         : "Coverage"
                    ]
                }
            }
        }

    }

//    stage("Checkout") {
//        checkout(scm)
//    }
//
//    stage("Setup") {
//        dockerImage.inside() {
//            sh "npm -v"
//        }
//    }
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
//
//    stage("Test") {
//        dockerImage.inside() {
//            sh "npm test"
//        }
//    }
//
//    stage("Code coverage") {
//        dockerImage.inside() {
//            sh "npm run coverage"
//        }
//        post {
//            success {
//                publishHTML target: [
//                    allowMissing         : false,
//                    alwaysLinkToLastBuild: false,
//                    keepAll              : true,
//                    reportDir            : "coverage",
//                    reportFiles          : "index.html",
//                    reportName           : "RCov Report",
//                    reportTitles         : "Coverage"
//                ]
//            }
//        }
//    }

}
