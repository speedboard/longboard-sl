node {

    stage("Checkout") {
        checkout(scm)
    }

    stage("Approval deployment") {
        parallel(
            dev: {
                if (currentBuild.result == null || currentBuild.result == "SUCCESS") {
                    timeout(time: 3, unit: "MINUTES") {
                        input message: "Approve deployment?"
                    }
                    timeout(time: 2, unit: "MINUTES") {
                        echo "build  ${env.BUILD_NUMBER} versions..."
                    }
                }
            },
            qa: {
                currentBuild.result = 'UNSTABLE'
            },
            uat: {
                currentBuild.result = 'UNSTABLE'
            }
        )
    }

}
