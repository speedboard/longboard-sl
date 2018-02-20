env.COVERALLS_REPO_TOKEN = "oo4QtcamdeOkH2aijnDfFjeyS79CQHLnC"
env.DATABASE_URL = "mongodb://172.17.0.1:27017/speedboard"
env.DATABASE_NAME = "speedboard"
env.CI = true

node {

    def dockerImage = docker.build("longboard:${env.BUILD_ID}")

    stage("Checkout") {
        checkout(scm)
    }

    dockerImage.inside() {

        stage("Setup") {
            sh "echo ${env.COVERALLS_REPO_TOKEN}"
        }

        stage("Generate Cert") {
            sh "openssl genrsa 4096 -aes256 > longboard.pem"
            sh "openssl pkcs8 -topk8 -inform PEM -outform PEM -in longboard.pem -out longboard-private.pem -nocrypt"
            sh "openssl rsa -in longboard-private.pem -pubout -outform PEM -out longboard-public.pem"
        }

        stage("Install dependencies") {
            withEnv(["DATABASE_URL = \"mongodb://172.17.0.1:27017/speedboard\"", "DATABASE_NAME = \"speedboard\""]) {
                sh "npm i"
            }
        }

        stage("Test") {
            sh "npm test"
        }

        stage("Code coverage") {

            withEnv(["COVERALLS_REPO_TOKEN = oo4QtcamdeOkH2aijnDfFjeyS79CQHLnC", "CI = true"]) {
                sh "npm run coverage"
            }

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

    // Clean up workspace
    step([$class: 'WsCleanup'])

}
