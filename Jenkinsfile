pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
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

        stage('Run') {
            steps {
                echo 'Running Employee App...'
                bat 'npm start'
            }
        }
    }

    post {
        success {
            echo 'Employee pipeline success!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
