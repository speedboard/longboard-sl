node {

    stage("Checkout") {
        checkout(scm)
    }

    stages {
        stage('Full Build') {
            when {
                branch "master"
            }
        }

        stage('Incremental Build') {
            when {
                branch "master"
            }
        }
    }

}
