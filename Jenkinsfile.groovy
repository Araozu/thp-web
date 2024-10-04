pipeline {
    agent {
        docker {
            image 'gplane/pnpm:9.11.0'
        }
    }
    stages {
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
