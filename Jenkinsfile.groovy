pipeline {
    agent any
    environment {
        PATH = "/var/lib/jenkins/bin:/var/lib/jenkins/.nvm/versions/node/v20.9.0/bin:${env.PATH}"
    }
    stages {
        stage('Install deps') {
            steps {
                sh 'pnpm i'
            }
        }
        stage("Test") {
            steps {
                sh 'pnpm test'
            }
        }
        stage('Build bundle') {
            steps {
                sh 'pnpm build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'cp -r ./dist/* /var/www/thp-docs/'
            }
        }
    }
}