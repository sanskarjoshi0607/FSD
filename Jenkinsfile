pipeline {
    agent any

    stages {

        stage('Environment Check') {
            steps {
                echo '================================='
                echo 'Checking Node.js installation...'
                echo '================================='

                bat '''
                    echo Checking Node.js...
                    "C:\\Program Files\\nodejs\\node.exe" -v

                    echo.
                    echo Checking npm...
                    "C:\\Program Files\\nodejs\\npm.cmd" -v
                '''
            }
        }

        stage('Run Tests') {
            steps {
                echo '================================='
                echo 'Running Test Cases...'
                echo '================================='

                bat '''
                    "C:\\Program Files\\nodejs\\node.exe" test.js
                '''
            }
        }
    }

    post {
        always {
            echo '================================='
            echo 'Jenkins Build Completed'
            echo '================================='
        }

        success {
            echo 'All test cases passed successfully!'
        }

        failure {
            echo 'Build failed. Please check the Console Output.'
        }
    }
}