node {

    stages {

        stage("Checkout") {
            checkout(scm)
        }

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
