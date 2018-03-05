node {


    stage("Checkout") {
        checkout(scm)
    }

    stage('Full Build') {
        step([$class: "stageHasRun"])
    }

    stage('Incremental Build') {
        step([$class: "stageHasRun"])
    }

}
