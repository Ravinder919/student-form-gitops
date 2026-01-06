pipeline {
  agent any

  environment {
    AWS_REGION = "us-west-1"
    CLUSTER_NAME = "ec2-jenkins"
  }

  stages {
    
    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('Configure Kubeconfig') {
      steps {
        sh '''
          set -e
          aws eks update-kubeconfig \
            --region $AWS_REGION \
            --name $CLUSTER_NAME
        '''
      }
    }

    stage('Verify Cluster Access') {
      steps {
        sh '''
          kubectl get nodes
        '''
      }
    }

    stage('Deploy to EKS') {
      steps {
        sh '''
          kubectl apply -f apps/
        '''
      }
    }

    stage('Verify Deployment') {
      steps {
        sh '''
          kubectl get pods
          kubectl get svc
        '''
      }
    }
  }

  post {
    success {
      echo "✅ Deployment successful. Student Form app is live."
    }
    failure {
      echo "❌ Deployment failed. Check kubectl logs & events."
    }
  }
}
