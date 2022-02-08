pipeline {
  agent any
    
  tools {nodejs "My Node"}
    
  stages {
        
   
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }  
    
            
    stage('Test') {
      steps {
        sh 'node test'
      }
    }
  }
}
