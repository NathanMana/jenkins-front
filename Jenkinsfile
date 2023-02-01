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
                    discordSend description: 'Installing the project', footer: '', image: 'https://i.kym-cdn.com/photos/images/masonry/002/153/109/868.jpg', link: 'env.BUILD_URL', result: '', scmWebUrl: '', thumbnail: 'https://ftp.halifax.rwth-aachen.de/jenkins/art/jenkins-logo/96x96/logo.png', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                script {
                    sh 'npm run test'
                    discordSend description: 'Running the tests', footer: '', image: 'https://i.kym-cdn.com/photos/images/masonry/002/153/109/868.jpg', link: 'env.BUILD_URL', result: '', scmWebUrl: '', thumbnail: 'https://ftp.halifax.rwth-aachen.de/jenkins/art/jenkins-logo/96x96/logo.png', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
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
                discordSend description: 'Building the docker image', footer: '', image: 'https://i.kym-cdn.com/photos/images/masonry/002/153/109/868.jpg', link: 'env.BUILD_URL', result: '', scmWebUrl: '', thumbnail: 'https://ftp.halifax.rwth-aachen.de/jenkins/art/jenkins-logo/96x96/logo.png', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
            }
        }
        stage('Publish') {
            steps {
                echo 'Publishing..'
                echo 'Running docker push..'
                discordSend description: 'Publishing the docker image', footer: '', image: 'https://i.kym-cdn.com/photos/images/masonry/002/153/109/868.jpg', link: 'env.BUILD_URL', result: '', scmWebUrl: '', thumbnail: 'https://ftp.halifax.rwth-aachen.de/jenkins/art/jenkins-logo/96x96/logo.png', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
            }
        }
        stage('Cleanup') {
            steps {
                echo 'Cleaning..'
                echo 'Running docker rmi..'
                discordSend description: 'Cleaning everything up', footer: '', image: 'https://i.kym-cdn.com/photos/images/masonry/002/153/109/868.jpg', link: 'env.BUILD_URL', result: '', scmWebUrl: '', thumbnail: 'https://ftp.halifax.rwth-aachen.de/jenkins/art/jenkins-logo/96x96/logo.png', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
            }
        }
    }
}
