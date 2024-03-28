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
        stage('Build tailwind') {
            environment {
                PATH = "${env.WORKSPACE}/node_modules/.bin:${env.PATH}"
            }
            steps {
                sh 'md-docs'
                sh './node_modules/.bin/tailwindcss -i ./tailwind.css -o ./static/css/out.css --minify'
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