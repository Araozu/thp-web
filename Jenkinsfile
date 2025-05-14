pipeline {
	agent {
		node {
			label "hetzner-helsinki-01"
		}
	}

	stages {
		stage('Build') {
			agent {
				docker {
					image 'node:22-alpine'
					reuseNode true
					args '-u 0:0 -v /var/bin:/var/bin'
				}
			}
			steps {
				sh 'npm i -g pnpm'
				sh 'pnpm i'
				sh 'VITE_THP_BINARY=/var/bin/thp-zig pnpm build'
			}
		}
		stage('Deploy') {
			steps {
				sh 'rm -rf /var/www/thp-lang.org/*'
				sh 'cp -r dist/* /var/www/thp-lang.org/'
				sh 'docker compose down || true'
				sh 'docker compose up -d'
			}
		}
	}
}

