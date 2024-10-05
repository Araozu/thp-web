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
				sh 'THP_BINARY=/var/bin/thp pnpm build'
			}
		}
		stage('Deploy') {
			steps {
				sh 'rm -rf /var/www/thp-lang.org/*'
				sh 'mv -f dist/* /var/www/thp-lang.org/'
			}
		}
	}
}

