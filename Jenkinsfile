pipeline {
  agent any
    
  tools {nodejs "My Node"}
    
  stages {
        
    stage('Git') {
      steps {
        git 'https://github.com/blessingmwalein/ticket-backend.git'
      }
    }
     
    stage('Build') {
      steps {
        sh 'npm install'
         sh '<<Build Command>>'
      }
    }  
    
            
    stage('Test') {
      steps {
        sh 'node test'
      }
    }
  }
}
