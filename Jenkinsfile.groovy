pipeline {
    agent any
    environment {
        PATH = "/var/lib/jenkins/.bun/bin/:/var/lib/jenkins/bin:/var/lib/jenkins/.nvm/versions/node/v20.9.0/bin:${env.PATH}"
    }
    stages {
        stage('Install deps') {
            steps {
                sh 'bun i'
            }
        }
        stage('Build bundle') {
            steps {
                sh 'bun run build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'cp -r ./dist/* /var/www/thp-docs/'
            }
        }
    }
}