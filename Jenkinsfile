node {


    stage("Checkout") {
        checkout(scm)
    }

    stage('Full Build') {
        stageHasRun {
            branch "master"
        }
    }

    stage('Incremental Build') {
        stageHasRun {
            branch "master"
        }
    }

}
