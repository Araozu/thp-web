pipeline {
    agent {
        docker {
            image 'node:22'
        }
    }
    stages {
        stage('Clone Repository') {
            steps {
                git url: 'http://gitea:3333/fernando/thp-web.git', branch: 'master'
            }
        }
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
                sh 'npm build'
            }
        }
    }
}
