pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Files') {
            steps {
                bat '''
                    if not exist registration.html exit /b 1
                    if not exist style.css exit /b 1
                    if not exist registration.js exit /b 1
                    if not exist server.js exit /b 1
                    if not exist test.js exit /b 1
                    if not exist users.json exit /b 1
                    if not exist Dockerfile exit /b 1
                '''
            }
        }

        stage('Run Tests') {
            steps {
                bat 'node test.js'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t registration-app .'
            }
        }

        stage('Stop Old Container') {
            steps {
                bat '''
                    docker rm -f registration-container 2>NUL
                    exit /b 0
                '''
            }
        }

        stage('Docker Run') {
            steps {
                bat '''
                    docker run -d -p 3000:3000 --name registration-container registration-app
                '''
            }
        }

        stage('Docker Verify') {
            steps {
                bat 'docker ps'
            }
        }
        stage('Check Docker') {
    steps {
        bat '''
            echo Checking Docker...
            where docker
            docker --version
            docker info
        '''
    }
}
    }
}