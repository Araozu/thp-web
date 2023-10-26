pipeline {
    agent any
    environment {
        PATH = "/var/lib/jenkins/.bun/bin:/var/lib/jenkins/bin:${env.PATH}"
    }
    stages {
        stage('Test env') {
            steps {
                echo 'Testing...'
                echo 'Is Bun working?...'
                sh 'bun --version'
            }
        }
        stage('Build') {
            steps {
                sh 'bun tailwind:build'
                sh 'md-docs'
            }
        }
    }
}