def FAILED_STAGE

pipeline {
    environment {
        registry = "mayth3f0rc3bwizu/jenkins-project"
        registryCredential = 'docker-hub'
        dockerImage = ''
        ANSIBLE_PRIVATE_KEY=credentials('5e1abe13-d9f3-4f10-a499-21bfa5ddfcdb')
        discordImage = 'https://www.zend.com/sites/default/files/image/2019-09/logo-jenkins.jpg'
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
                    discordSend description: 'Installing the project\n Running: npm install\n'+installOutput, footer: '', image: discordImage, link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                script {
                    FAILED_STAGE=env.STAGE_NAME
                    def testOutput = sh(returnStdout: true, script: 'npm run test')
                    discordSend description: 'Running the tests\n Running: npm run test\n'+testOutput, footer: '', image: discordImage, link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
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
                    discordSend description: 'Building the docker image\n Running: docker build -t moulin\n'+buildOutput, footer: '', image: discordImage, link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
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
                    discordSend description: 'Publishing the docker image\n Running: docker push\n'+publishOutput, footer: '', image: discordImage, link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
                }
            }
        }
        stage('Cleanup') {
            steps {
                script {
                    FAILED_STAGE=env.STAGE_NAME
                    echo 'Cleaning..'
                    def cleanupOutput = sh(
                        returnStdout: true, 
                        // script: 'docker stop $(docker ps -q) || docker rm $(docker ps -a -q) || docker rmi $(docker images -q -f dangling=true) || docker image prune -a -f'
                        script: '''
                            docker rmi mayth3f0rc3bwizu/jenkins-project
                            docker rmi registry.hub.docker.com/mayth3f0rc3bwizu/jenkins-project
                        '''
                    )
                    discordSend description: 'Cleaning everything up\n Running: docker rmi\n'+cleanupOutput, footer: '', image: discordImage, link: '', result: 'SUCCESS', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
                }
            }
        }
        stage ("Deploying instance") {
            steps {
                sshagent(credentials : ['5e1abe13-d9f3-4f10-a499-21bfa5ddfcdb']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@52.210.144.84
                        ssh ubuntu@52.210.144.84 "cd terraform/deploy && terraform init && terraform destroy -auto-approve && terraform apply -auto-approve"
                    '''
                }
            }
        }
    }
    post {
        failure {
            discordSend description: "Failure on stage ${FAILED_STAGE}", footer: '', image: discordImage, link: '', result: 'FAILED', scmWebUrl: '', thumbnail: '', title: 'Jenkins Build', webhookURL: DISCORD_WEBHOOK_URL
        }
    }
}
