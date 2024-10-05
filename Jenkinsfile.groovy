pipeline {
    agent {
        docker {
            image 'node:22'
        }
    }
    stages {
        stage('Install pnpm') {
            steps {
                sh 'npm i -g pnpm'
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'pnpm i'
            }
        }
        stage('Buid') {
            steps {
                sh 'pnpm build'
            }
        }
    }
}
