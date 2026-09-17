pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out Blog Application...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('CI Check') {
            steps {
                echo 'Checking project files...'
                bat 'node --version'
                bat 'npm --version'
                bat 'if not exist server.js exit /b 1'
                bat 'if not exist package.json exit /b 1'
            }
        }

        stage('Build') {
            steps {
                echo 'Blog Application build completed.'
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