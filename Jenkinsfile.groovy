pipeline {
    agent any
    environment {
        PATH = "/var/lib/jenkins/.bun/bin:${env.PATH}"
    }
    stages {
        stage('Test') {
            steps {
                echo 'Testing...'
                echo 'Is Bun working?...'
                sh 'bun --version'
            }
        }
    }
}