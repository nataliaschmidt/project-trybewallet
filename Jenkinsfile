pipeline {
    agent any

    stages {
        stage('Baixar fonte') {
            steps { 
                    sh 'ssh ubuntu@172.17.0.1 "rm -rf /home/ubuntu/apps/TrybeWallet"'
                    sh 'ssh ubuntu@172.17.0.1 "mkdir -p /home/ubuntu/apps/TrybeWallet"'
                    sh 'scp -r /var/jenkins_home/workspace/TrybeWallet/. ubuntu@172.17.0.1:/home/ubuntu/apps/TrybeWallet'
            } 
        }
        stage('Instalar') {
            steps {
                        sh 'ssh ubuntu@172.17.0.1 "cd /home/ubuntu/apps/TrybeWallet;npm install"'
            }
        }
        stage('Construir') {
            steps {
                        sh 'ssh ubuntu@172.17.0.1 "cd /home/ubuntu/apps/TrybeWallet;npm run build"'
            }
        }
        stage('Iniciar') { 
            steps {
                    sh 'ssh ubuntu@172.17.0.1 "cd /home/ubuntu/apps/TrybeWallet;export JENKINS_NODE_COOKIE=dontKillMe;pm2 stop TrybeWallet --silent;pm2 delete TrybeWallet --silent"'
                    sh 'ssh ubuntu@172.17.0.1 "cd /home/ubuntu/apps/TrybeWallet;pm2 start -n TrybeWallet npm -- start;pm2 save --force"' 
            }
        }
    }
}
