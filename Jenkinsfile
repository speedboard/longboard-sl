#!/usr/bin/env groovy
pipeline {
    agent {
        docker {
            image 'node:alpine'
            args '-u root'
        }
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '2'))
    }
    environment {
        COVERALLS_REPO_TOKEN = 'oo4QtcamdeOkH2aijnDfFjeyS79CQHLnC'
        DATABASE_URL = 'mongodb://172.17.0.1:27017/speedboard'
        DATABASE_NAME = 'speedboard'
        CI = true
    }
    stages {
        stage('Setup') {
            steps {
                sh 'apk add --no-cache \'su-exec>=0.2\''
                sh 'apk add --update --no-cache openssl'
            }
        }
        stage('Cert') {
            steps {
                sh 'openssl genrsa 4096 -aes256 > longboard.pem'
                sh 'openssl pkcs8 -topk8 -inform PEM -outform PEM -in longboard.pem -out longboard-private.pem -nocrypt'
                sh 'openssl rsa -in longboard-private.pem -pubout -outform PEM -out longboard-public.pem'
            }
        }
        stage('Build') {
            steps {
                sh 'npm i'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Code analysis') {
            steps {
                parallel(
                    coverage: {
                        sh 'npm run coverage'
                    },
                    sonar: {
                        script {
                            scannerHome = tool 'SonarQube'
                        }
                        withSonarQubeEnv('SonarQube') {
                            sh("${scannerHome}/bin/sonar-scanner " +
                                "-Dsonar.login=${env.SONAR_AUTH_TOKEN} " +
                                "-Dsonar.host.url=${env.SONAR_HOST_URL}  " +
                                "-Dsonar.projectKey=longboard " +
                                "-Dsonar.projectName=longboard-sl " +
                                "-Dsonar.projectVersion=1.0.0-alpha.1 " +
                                "-Dsonar.branch=${env.BRANCH_NAME} " +
                                "-Dsonar.sources=. " +
                                "-Dsonar.sourceEncoding=UTF-8 " +
                                "-Dsonar.exclusions=**/node_modules/**,**/*.js " +
                                "-Dsonar.test.inclusions=**/*.spec.ts " +
                                "-Dsonar.ts.coverage.lcovReportPath=coverage/lcov.info",
                                "-Dsonar.typescript.lcov.reportPaths=coverage/lcov.info"
                            )
                        }

                    }
                )
            }
            post {
                success {
                    publishHTML target: [
                        allowMissing         : false,
                        alwaysLinkToLastBuild: false,
                        keepAll              : true,
                        reportDir            : 'coverage',
                        reportFiles          : 'index.html',
                        reportName           : 'RCov Report',
                        reportTitles         : 'Coverage'
                    ]
                }
            }
        }
        stage("Code quality") {
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
    }
    post {
        always {
            cleanWs()
        }
    }
}
