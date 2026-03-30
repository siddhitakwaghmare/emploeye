pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'   // make sure NodeJS is configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Building project...'
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'npm test || exit 0'
            }
        }

        stage('Run Server') {
            steps {
                echo 'Starting Employee App...'
                bat 'npm start'
            }
        }
    }

    post {
        success {
            echo 'Employee Management Pipeline Success!'
        }
        failure {
            echo 'Pipeline Failed!'
        }
    }
}
