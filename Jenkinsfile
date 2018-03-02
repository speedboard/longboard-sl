env.COVERALLS_REPO_TOKEN = "oo4QtcamdeOkH2aijnDfFjeyS79CQHLnC"
env.DATABASE_URL = "mongodb://172.17.0.1:27017/speedboard"
env.DATABASE_NAME = "speedboard"
env.AWS_ECR_DISABLE_CACHE = true
env.AWS_ECR_LOGIN = true
env.CI = true

pipeline {


    agent {
        docker {
            image("node:alpine")
        }
    }

    options {
        // For example, we'd like to make sure we only keep 10 builds at a time, so
        // we don't fill up our storage!
        buildDiscarder(logRotator(numToKeepStr: "2"))

        // And we'd really like to be sure that this build doesn't hang forever, so
        // let's time it out after an hour.
        timeout(time: 25, unit: 'MINUTES')
    }

    // global env variables
    environment {
        COVERALLS_REPO_TOKEN = "oo4QtcamdeOkH2aijnDfFjeyS79CQHLnC"
        DATABASE_URL = "mongodb://172.17.0.1:27017/speedboard"
        DATABASE_NAME = "speedboard"
        AWS_ECR_DISABLE_CACHE = true
        AWS_ECR_LOGIN = true
        CI = true
    }

    stage("Checkout") {
        checkout(scm)
    }

    stage("Build and install dependencies") {
        steps {
            sh "npm i"
        }
    }

    stage("Development deploy approval") {

        if (currentBuild.result == null || currentBuild.result == "SUCCESS") {
            timeout(time: 3, unit: "MINUTES") {
                input message: "Approve deployment?"
            }
            timeout(time: 2, unit: "MINUTES") {
                echo "build  ${env.BUILD_NUMBER} versions..."
            }
        }

    }

    stage("QA release approval and publish artifact") {

        when {
            branch "master"
        }

        if (currentBuild.result == null || currentBuild.result == "SUCCESS") {
            timeout(time: 3, unit: "MINUTES") {
                //input message:"Approve deployment?", submitter: "it-ops"
                input message: "Approve deployment to QA?"
            }
        }

    }

    post {
        always {
            cleanWs()
        }
    }

}
