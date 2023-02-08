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
                    discordSend description: 'Installing the project\n Running: npm install', footer: '', image: 'https://i.pinimg.com/originals/e7/27/fc/e727fcca2ea75670e14297f353921ed2.gif', link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                script {
                    FAILED_STAGE=env.STAGE_NAME
                    sh 'npm run test'
                    discordSend description: 'Running the tests\n Running: npm run test', footer: '', image: 'https://media.tenor.com/arqlNu8gyJYAAAAC/cat-cat-jumping.gif', link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
                }
            }
        }
        stage('Build') {
            agent {
                dockerfile true
               
            }
            steps {
                script {
                    FAILED_STAGE=env.STAGE_NAME
                    echo 'Building..'
                    echo 'Running docker build -t moulin'
                    discordSend description: 'Building the docker image\n Running: docker build -t moulin', footer: '', image: 'https://media.tenor.com/L2yGz-RI-KYAAAAd/the-voices-meme.gif', link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
                }
           }
        }
        stage('Publish') {
            steps {
                script {
                    FAILED_STAGE=env.STAGE_NAME
                    echo 'Publishing..'
                    echo 'Running docker push..'
                    discordSend description: 'Publishing the docker image\n Running: docker push', footer: '', image: 'https://media.tenor.com/3hNFj_XibiYAAAAM/cat.gif', link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
                }
            }
        }
        stage('Cleanup') {
            steps {
                script {
                    FAILED_STAGE=env.STAGE_NAME
                    echo 'Cleaning..'
                    echo 'Running docker rmi..'
                    discordSend description: 'Cleaning everything up\n Running: docker rmi', footer: '', image: 'https://media.tenor.com/fTTVgygGDh8AAAAM/kitty-cat-sandwich.gif', link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
                }
            }
        }
    }
    post {
        failure {
            discordSend description: "Failure on stage ${FAILED_STAGE}", footer: '', image: 'https://media.tenor.com/dVaFKdfc3XwAAAAM/shaking-cat.gif', link: '', result: 'FAILED', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
        }
    }
}
