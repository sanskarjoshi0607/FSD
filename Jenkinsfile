pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo '================================='
                echo 'Checking out project...'
                echo '================================='

                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                echo '================================='
                echo 'Checking Node.js installation...'
                echo '================================='

                bat 'node --version'
            }
        }

        stage('Test') {
            steps {
                echo '================================='
                echo 'Running 10 Test Cases...'
                echo '================================='

                bat 'node test.js'
            }
        }

        stage('Build') {
            steps {
                echo '================================='
                echo 'Building Project...'
                echo '================================='

                bat 'echo Static HTML project - no build required'
            }
        }

        stage('Deploy') {
            steps {
                echo '================================='
                echo 'Deployment Stage'
                echo '================================='

                echo 'Project passed all 10 test cases.'
                echo 'Ready for deployment.'
            }
        }
    }

    post {

        success {
            echo '================================='
            echo 'JENKINS PIPELINE SUCCESS'
            echo 'ALL 10 TEST CASES PASSED!'
            echo '================================='
        }

        failure {
            echo '================================='
            echo 'JENKINS PIPELINE FAILED'
            echo 'One or more test cases failed.'
            echo '================================='
        }
    }
}