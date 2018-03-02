pipeline {

    agent {
        docker {
            image("node:alpine")
        }
    }

    stages {

        stage("Teste") {

            steps {
                node("master") {
                    step {
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
        }

    }

}
