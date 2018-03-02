pipeline {

    agent {
        docker {
            image("node:alpine")
            args "-u root"
        }
    }

    options {
        // For example, we"d like to make sure we only keep 10 builds at a time, so
        // we don"t fill up our storage!
        buildDiscarder(logRotator(numToKeepStr: "2"))

        // And we"d really like to be sure that this build doesn"t hang forever, so
        // let"s time it out after an hour.
        timeout(time: 25, unit: "MINUTES")
    }

    // global env variables
    environment {
        COVERALLS_REPO_TOKEN = "oo4QtcamdeOkH2aijnDfFjeyS79CQHLnC"
        DATABASE_URL = "mongodb://172.17.0.1:27017/speedboard"
        RSA_PRIVATE_KEY = "longboard-private.pem"
        RSA_PUBLIC_KEY = "longboard-public.pem"
        DATABASE_NAME = "speedboard"
        AWS_ECR_DISABLE_CACHE = true
        AWS_ECR_LOGIN = true
        CI = true
    }

    stages {

        stage("Generate RSA") {
            steps {
                sh "apk add --update --no-cache openssl"
                sh "openssl genrsa 4096 -aes256 > longboard.pem"
                sh "openssl pkcs8 -topk8 -inform PEM -outform PEM -in longboard.pem -out longboard-private.pem -nocrypt"
                sh "openssl rsa -in longboard-private.pem -pubout -outform PEM -out longboard-public.pem"
            }
        }

        stage("Build and install dependencies") {
            steps {
                sh "npm i"
            }
        }

        stage("Run unit test") {
            steps {
                sh "npm test"
            }
        }

        stage("Code publish") {

            steps {

                parallel(
                    cobertura: {

                        sh "npm run coverage"

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
                    junit: {

                        sh "npm run junit"

                        // Publish test"s
                        step([
                            $class     : "JUnitResultArchiver",
                            testResults: "**/**junit.xml"
                        ])

                    }
                )

            }

        }

        stage("Code analysis") {

            agent any

            steps {

                script {
                    scannerHome = tool "SonarScanner"
                }

                withSonarQubeEnv("SonarQube") {
                    sh("${scannerHome}/bin/sonar-scanner " +
                        "-Dsonar.login=${env.SONAR_AUTH_TOKEN} " +
                        "-Dsonar.host.url=${env.SONAR_HOST_URL}  " +
                        "-Dsonar.branch=${env.BRANCH_NAME} ")
                }

            }

        }

        stage("Code quality") {

            agent any

            steps {

                script {

                    timeout(time: 1, unit: "HOURS") {
                        def qg = waitForQualityGate()
                        if (qg.status != "OK") {
                            error("Pipeline aborted due to quality gate failure: ${qg.status}")
                        }

                    }

                }

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
