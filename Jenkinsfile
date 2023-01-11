pipeline {
    agent {
        docker
        dockerfile true
    }
    tools {
        nodejs 'node'
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
