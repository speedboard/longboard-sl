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

    stages {

        stage("Checkout") {
            steps {
                checkout(scm)
            }
        }

        stage("Build and install dependencies") {
            steps {
                sh "npm i"
            }
        }

        stage("Run unit test") {
            sh "npm test"
        }

        stage("Code analysis") {
            steps {
                parallel(
                    coveralls: {

                        sh "npm run coverage"

                        publishHTML target: [
                            allowMissing         : false,
                            alwaysLinkToLastBuild: false,
                            keepAll              : true,
                            reportDir            : "coverage",
                            reportFiles          : "index.html",
                            reportName           : "RCov Report",
                            reportTitles         : "Coverage"
                        ]

                    },
                    cobertura: {

                        step([
                            $class                    : "CoberturaPublisher",
                            coberturaReportFile       : "**/**coverage.xml",
                            conditionalCoverageTargets: "70, 0, 0",
                            lineCoverageTargets       : "80, 0, 0",
                            methodCoverageTargets     : "80, 0, 0",
                            sourceEncoding            : "UTF_8",
                            autoUpdateHealth          : false,
                            autoUpdateStability       : false,
                            failUnhealthy             : false,
                            failUnstable              : false,
                            zoomCoverageChart         : true,
                            maxNumberOfBuilds         : 0
                        ])

                    },

                )

            }

        }

        stage("Development deploy approval") {

            steps {

                script {

                    if (currentBuild.result == null || currentBuild.result == "SUCCESS") {

                        timeout(time: 3, unit: "MINUTES") {
                            input message: "Approve deployment?"
                        }

                        timeout(time: 2, unit: "MINUTES") {
                            echo "build  ${env.BUILD_NUMBER} versions..."
                        }

                    }

                }

            }

        }

        stage("QA release approval and publish artifact") {

            when {
                branch "master"
            }

            steps {

                script {

                    if (currentBuild.result == null || currentBuild.result == "SUCCESS") {
                        timeout(time: 3, unit: "MINUTES") {
                            //input message:"Approve deployment?", submitter: "it-ops"
                            input message: "Approve deployment to QA?"
                        }
                    }

                }

            }

        }

    }

    post {
        always {
            cleanWs()
        }
    }

}
