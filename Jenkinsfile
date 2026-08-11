pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out project...'
                checkout scm
            }
        }

        stage('Test') {
            steps {
                echo 'Running 10 test cases...'
                bat 'node test.js'
            }
        }

        stage('Build') {
            steps {
                echo 'Building project...'
                bat 'echo Static HTML project - no build required'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Project passed all 10 test cases.'
                echo 'Ready for deployment.'
            }
        }
    }

    post {
        success {
            echo 'Jenkins pipeline completed successfully!'
        }

        failure {
            echo 'Jenkins pipeline failed!'
        }
    }
}