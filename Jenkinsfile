pipeline {
    agent any

    environment {
        AWS_REGION = "us-west-1"
        ACCOUNT_ID = "605518582307"
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')

        BACKEND_REPO  = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/backend"
        FRONTEND_REPO = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/frontend"

        IMAGE_TAG = "latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/sahu04/fullstack-devops-fronend-backend.git'
            }
        }

        stage('Login to ECR') {
            steps {
                sh """
                aws ecr get-login-password --region ${AWS_REGION} | \
                docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                """
            }
        }

        stage('Build & Push Images') {
            parallel {

                stage('Backend') {
                    steps {
                        sh """
                        docker build -t backend:${IMAGE_TAG} ./backend
                        docker tag backend:${IMAGE_TAG} ${BACKEND_REPO}:${IMAGE_TAG}
                        docker push ${BACKEND_REPO}:${IMAGE_TAG}
                        """
                    }
                }

                stage('Frontend') {
                    steps {
                        sh """
                        docker build -t frontend:${IMAGE_TAG} ./frontend
                        docker tag frontend:${IMAGE_TAG} ${FRONTEND_REPO}:${IMAGE_TAG}
                        docker push ${FRONTEND_REPO}:${IMAGE_TAG}
                        """
                    }
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh """
                aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID}
                aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY}

                aws eks update-kubeconfig \
                --region ${AWS_REGION} \
                --name fullstack-cluster
                """

              
                sh "kubectl apply -f apps/"
            }
        }
    }
}
