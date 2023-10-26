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
                sh 'tailwindcss -i ./tailwind.css -o ./static/css/out.css --minify'
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