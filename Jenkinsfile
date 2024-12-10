pipeline {
    agent any
    environment {
        GIT_REPOSITORY_NAME = "${scm.getUserRemoteConfigs()[0].getUrl().tokenize('/')[3].split("\\.")[0]}"
        GIT_TAG = sh(script: 'git tag --contains | head -1', returnStdout: true).trim()
        GIT_BRANCH_NAME = "${env.GIT_BRANCH.split("/")[1]}"
    }
    stages {
        stage('Run Unit Tests and Static Code Analysis') {
            when {
                expression { env.GIT_BRANCH_NAME == 'develop' && env.GIT_TAG == null } 
            }
            agent {
                docker {
                    image 'node:lts'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            stages {
                stage('Install dependencies') {
                    steps {
                        sh 'npm install --no-package-lock'
                    }
                }
                stage('Static Code Analysis') {
                    steps {
                        sh 'npm run lint'
                    }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}