env.COVERALLS_REPO_TOKEN = "oo4QtcamdeOkH2aijnDfFjeyS79CQHLnC"
env.DATABASE_URL = "mongodb://172.17.0.1:27017/speedboard"
env.DATABASE_NAME = "speedboard"
env.CI = true

node {

    stage("Checkout") {
        checkout(scm)
    }

    docker.image("node:alpine").inside('-u root') {

        stage("Setup") {
            sh "apk add --update --no-cache openssl"
        }

        stage("Generate RSA") {
            sh "openssl genrsa 4096 -aes256 > longboard.pem"
            sh "openssl pkcs8 -topk8 -inform PEM -outform PEM -in longboard.pem -out longboard-private.pem -nocrypt"
            sh "openssl rsa -in longboard-private.pem -pubout -outform PEM -out longboard-public.pem"
        }

        stage("Install dependencies") {
            sh "npm i"
        }

        stage("Run unit test") {
            sh "npm test"
        }

    }

    stage("Code analysis") {
        parallel(
            coveralls: {
                docker.image("node:alpine").inside() {

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

                }
            },
            sonarqube: {

                script {
                    scannerHome = tool "SonarScanner"
                }

                withSonarQubeEnv("SonarQube") {
                    sh("${scannerHome}/bin/sonar-scanner " +
                        "-Dsonar.login=${env.SONAR_AUTH_TOKEN} " +
                        "-Dsonar.host.url=${env.SONAR_HOST_URL}  " +
                        "-Dsonar.branch=${env.BRANCH_NAME} ")
                }

            },
            cobertura: {
                // Publish coverage
                step([
                    $class                    : 'CoberturaPublisher',
                    autoUpdateHealth          : false,
                    autoUpdateStability       : false,
                    coberturaReportFile       : '**/**coverage.xml',
                    conditionalCoverageTargets: '70, 0, 0',
                    failUnhealthy             : false, failUnstable: false,
                    lineCoverageTargets       : '80, 0, 0',
                    maxNumberOfBuilds         : 0,
                    methodCoverageTargets     : '80, 0, 0',
                    sourceEncoding            : 'UTF_8',
                    zoomCoverageChart         : true]
                )
            },

        )
    }

    stage("Code quality") {
        timeout(time: 1, unit: "HOURS") {
            def qg = waitForQualityGate()
            if (qg.status != "OK") {
                error("Pipeline aborted due to quality gate failure: ${qg.status}")
            }
        }
    }

    // Clean up workspace
    step([$class: 'WsCleanup'])

}