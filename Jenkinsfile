def FAILED_STAGE

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
                    FAILED_STAGE=env.STAGE_NAME
                    sh 'npm install'
                    discordSend description: 'Installing the project\n Running: npm install', footer: '', image: 'https://i.pinimg.com/originals/e7/27/fc/e727fcca2ea75670e14297f353921ed2.gif', link: 'http://54.170.214.129:8080/', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                script {
                    FAILED_STAGE=env.STAGE_NAME
                    sh 'npm run test'
                    discordSend description: 'Running the tests\n Running: npm run test', footer: '', image: 'https://i.pinimg.com/originals/e7/27/fc/e727fcca2ea75670e14297f353921ed2.gif', link: 'http://54.170.214.129:8080/', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
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
                discordSend description: 'Building the docker image\n Running: docker build -t moulin', footer: '', image: 'https://i.pinimg.com/originals/e7/27/fc/e727fcca2ea75670e14297f353921ed2.gif', link: 'http://54.170.214.129:8080/', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
            }
        }
        stage('Publish') {
            steps {
                echo 'Publishing..'
                echo 'Running docker push..'
                discordSend description: 'Publishing the docker image\n Running: docker push', footer: '', image: 'https://i.pinimg.com/originals/e7/27/fc/e727fcca2ea75670e14297f353921ed2.gif', link: 'http://54.170.214.129:8080/', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
            }
        }
        stage('Cleanup') {
            steps {
                echo 'Cleaning..'
                echo 'Running docker rmi..'
                discordSend description: 'Cleaning everything up\n Running: docker rmi', footer: '', image: 'https://i.pinimg.com/originals/e7/27/fc/e727fcca2ea75670e14297f353921ed2.gif', link: 'http://54.170.214.129:8080/', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
            }
        }
    }
    post {
        failure {
            discordSend description: "Failure on stage ${FAILED_STAGE}", footer: '', image: 'https://i.pinimg.com/originals/e7/27/fc/e727fcca2ea75670e14297f353921ed2.gif', link: '', result: 'FAILED', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: 'https://discord.com/api/webhooks/1070271483512893512/kI5i_3VgUYpDPdYbUJ9O-HbSnA3J6TtOCpVEumuE0txIv2lc7DZtbfAlYeIxUzNdR4D6'
        }
    }
}
