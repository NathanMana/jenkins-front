pipeline {
    agent {
        docker { 
            image 'node:16.13.1-alpine' 
            args '-u root:root'
        }
    }
    tools {
        nodejs 'node'
        dockerTool 'docker'
    }
    stages {
        stage('Startup') {
            steps {
                script {
                    sh 'npm install'
                    discordSend description: 'Installing the project', footer: '', image: '', link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                script {
                    sh 'npm run test'
                    discordSend description: 'Running the tests', footer: '', image: '', link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
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
                discordSend description: 'Building the docker image', footer: '', footer: '', image: '', link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
            }
        }
        stage('Publish') {
            steps {
                echo 'Publishing..'
                echo 'Running docker push..'
                discordSend description: 'Publishing the docker image', footer: '', image: '', link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
            }
        }
        stage('Cleanup') {
            steps {
                echo 'Cleaning..'
                echo 'Running docker rmi..'
                discordSend description: 'Cleaning everything up', footer: '', image: '', link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
            }
        }
    }
    post {
        failure {
            discordSend description: "Failure on stage ${FAILED_STAGE}", footer: '', image: '', link: '', result: 'FAILED', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
        }
    }
}
