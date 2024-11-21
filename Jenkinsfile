pipeline {
	stages {
		stage('Install pnpm') {
			agent {
				docker {
					image 'node:22'
				}
			}
			steps {
				sh 'npm i -g pnpm'
			}
		}
		stage('Install dependencies') {
			agent {
				docker {
					image 'node:22'
				}
			}
			steps {
				sh 'pnpm i'
			}
		}
		stage('Buid') {
			agent {
				docker {
					image 'node:22'
				}
			}
			steps {
				sh 'THP_BINARY=/var/bin/thp pnpm build'
			}
		}
		stage('Deploy') {
			steps {
				sh 'rm -rf /var/www/thp-lang.org/*'
				sh 'mv -f dist/* /var/www/thp-lang.org/'
				sh 'docker-compose down || true'
				sh 'docker-compose up -d'
			}
		}
	}
}

