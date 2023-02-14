def FAILED_STAGE

pipeline {
    environment {
        registry = "mayth3f0rc3bwizu/jenkins-project"
        registryCredential = 'docker-hub'
        dockerImage = ''
        ANSIBLE_PRIVATE_KEY=credentials('5e1abe13-d9f3-4f10-a499-21bfa5ddfcdb')
    }
    agent any
    tools {
        nodejs 'node'
    }
    stages {
        stage('Initialize'){
            steps {
                script{
                    def dockerHome = tool 'MyDocker'
                    env.PATH = "${dockerHome}/bin:${env.PATH}"
                }
            }
        }
        
        stage('Startup') {
            steps {
                script {
                    FAILED_STAGE=env.STAGE_NAME
                    def installOutput = sh(returnStdout: true, script: 'npm install')
                    discordSend description: 'Installing the project\n Running: npm install\n'+installOutput, footer: '', image: 'https://i.pinimg.com/originals/e7/27/fc/e727fcca2ea75670e14297f353921ed2.gif', link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                script {
                    FAILED_STAGE=env.STAGE_NAME
                    def testOutput = sh(returnStdout: true, script: 'npm run test')
                    discordSend description: 'Running the tests\n Running: npm run test\n'+testOutput, footer: '', image: 'https://media.tenor.com/arqlNu8gyJYAAAAC/cat-cat-jumping.gif', link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
                }
            }
        }
        stage('Build') {
            steps {
                    
                script {
                    FAILED_STAGE=env.STAGE_NAME
                    echo 'Building..'  
                    dockerImage =  docker.build("mayth3f0rc3bwizu/jenkins-project:latest")
                    def buildOutput = sh(returnStdout: true, script: 'echo Building')
                    discordSend description: 'Building the docker image\n Running: docker build -t moulin\n'+buildOutput, footer: '', image: 'https://media.tenor.com/L2yGz-RI-KYAAAAd/the-voices-meme.gif', link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
                }
           }
        }
        stage('Publish') {
            steps {
                script {
                    FAILED_STAGE=env.STAGE_NAME
                    echo 'Publishing..'
                    
                    docker.withRegistry('https://registry.hub.docker.com/', 'docker-hub') {
                        dockerImage.push()
                    }
                    def publishOutput = sh(returnStdout: true, script: 'echo "Running docker push.."')
                    discordSend description: 'Publishing the docker image\n Running: docker push\n'+publishOutput, footer: '', image: 'https://media.tenor.com/3hNFj_XibiYAAAAM/cat.gif', link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
                }
            }
        }
        stage('Cleanup') {
            steps {
                script {
                    FAILED_STAGE=env.STAGE_NAME
                    echo 'Cleaning..'
                    def cleanupOutput = sh(returnStdout: true, script: 'docker stop $(docker ps -q) || docker rm $(docker ps -a -q) || docker rmi $(docker images -q -f dangling=true)')
                    discordSend description: 'Cleaning everything up\n Running: docker rmi\n'+cleanupOutput, footer: '', image: 'https://media.tenor.com/fTTVgygGDh8AAAAM/kitty-cat-sandwich.gif', link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
                }
            }
        }
        stage ('Deploying instance') {
            steps {
                sh "cd deployment"
                sh "ls"
                sh "terraform init"
                sh "terraform destroy -auto-approve"
                sh 'terraform apply -var="private_key=$ANSIBLE_PRIVATE_KEY" -auto-approve'
            }
        }
    }
    post {
        failure {
            discordSend description: "Failure on stage ${FAILED_STAGE}", footer: '', image: 'https://media.tenor.com/dVaFKdfc3XwAAAAM/shaking-cat.gif', link: '', result: 'FAILED', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
        }
    }
}
