node {


    stage("Checkout") {
        checkout(scm)
    }

    stage('Full Build') {
        step([$class: "StageHasRunConditionalScript"])
    }

    stage('Incremental Build') {
        step([$class: "StageHasRunConditionalScript"])
    }

}
