pipeline {

    agent any

    options {

        skipDefaultCheckout()

        // For example, we"d like to make sure we only keep 10 builds at a time, so
        // we don"t fill up our storage!
        buildDiscarder(logRotator(numToKeepStr: "2"))

        // And we"d really like to be sure that this build doesn"t hang forever, so
        // let"s time it out after an hour.
        timeout(time: 25, unit: "MINUTES")

    }

    stages {

        stage("Checkout") {
            steps {
                checkout(scm)
            }
        }

        stage("Build and install dependencies") {
            agent {
                docker {
                    image("node:alpine")
                }
            }
            steps {
                sh "npm -v"
            }
        }

//        stage("Run unit test") {
//            agent {
//                docker {
//                    image("node:8-alpine")
//                }
//            }
//            steps {
//                sh "npm i"
//                sh "npm test"
//            }
//        }

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

}
