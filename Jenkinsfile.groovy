pipeline {
    agent any
    environment {
        PATH = "/var/lib/jenkins/.bun/bin/:/var/lib/jenkins/bin:${env.PATH}"
    }
    stages {
        stage('Install deps') {
            steps {
                sh 'bun i'
            }
        }
        stage('Build tailwind') {
            environment {
                PATH = "${env.WORKSPACE}/node_modules/.bin:${env.PATH}"
            }
            steps {
                sh 'md-docs'
                sh 'bun tailwind:watch'
            }
        }
        stage('Build bundle') {
            steps {
                sh 'bun bundle'
            }
        }
        stage('Deploy') {
            steps {
                sh 'cp -r ./static/* /var/www/thp-docs/'
            }
        }
    }
}