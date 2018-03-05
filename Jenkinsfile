node {


    stage("Checkout") {
        checkout(scm)
    }

    stage('Full Build') {
        tep([$class: "stageHasRun"])
    }

    stage('Incremental Build') {
        step([$class: "stageHasRun"])
    }

}
