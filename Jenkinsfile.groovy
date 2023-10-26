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
        stage('Install') {
            steps {
                sh 'bun install'
            }
        }
        stage('Build') {
            environment {
                PATH = "${env.WORKSPACE}/node_modules/.bin:${env.PATH}"
            }
            steps {
                sh 'echo $PATH'
                sh 'ls /var/lib/jenkins/workspace/thp-docs/node_modules/.bin'
                sh 'bun tailwind:build'
                sh 'md-docs'
            }
        }
        stage('Deploy') {
            steps {
                sh 'cp -r ./static/* /var/www/thp-docs/'
            }
        }
    }
}