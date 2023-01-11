pipeline {
    agent any
    tools {
        nodejs 'node'
        docker
    }
    stages {
        stage('Startup') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                script {
                    sh 'npm run test'
                }
            }
        }
        stage('Build') {
            agent {
                dockerfile true
            }
            steps {
                echo 'Building..'
                echo 'Running docker build -t moulin'
            }
        }
        stage('Publish') {
            steps {
                echo 'Publishing..'
                echo 'Running docker push..'
            }
        }
        stage('Cleanup') {
            steps {
                echo 'Cleaning..'
                echo 'Running docker rmi..'
            }
        }
    }
}
