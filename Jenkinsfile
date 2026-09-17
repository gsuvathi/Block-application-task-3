pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out Blog Application source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                bat 'npm install'
            }
        }

        stage('CI Check') {
            steps {
                echo 'Checking Blog Application files...'
                bat 'node --version'
                bat 'npm --version'
                bat 'if not exist server.js exit /b 1'
                bat 'if not exist package.json exit /b 1'
            }
        }

        stage('Build') {
            steps {
                echo 'Blog Application CI build completed successfully.'
            }
        }
    }

    post {
        success {
            echo 'CI Pipeline completed successfully!'
        }

        failure {
            echo 'CI Pipeline failed.'
        }
    }
}