pipeline {
    agent any
    environment {
        PATH = "/var/lib/jenkins/.local/share/pnpm:/var/lib/jenkins/.nvm:/var/lib/jenkins/.bun/bin:/var/lib/jenkins/bin:${env.PATH}"
    }
    stages {
        stage('Test env') {
            steps {
                echo 'Testing...'
                echo 'Is pnpm working?...'
                sh 'pnpm --version'
            }
        }
        stage('Install') {
            steps {
                sh 'pnpm i'
            }
        }
        stage('Build') {
            environment {
                PATH = "${env.WORKSPACE}/node_modules/.bin:${env.PATH}"
            }
            steps {
                sh 'pnpm tailwind:build'
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