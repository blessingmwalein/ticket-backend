pipeline {
  agent any
    
  tools {nodejs "My Node"}
    
  stages {
        
   
    stage('Build') {
      steps {
        sh 'sudo npm install'
        sh 'sudo ./deploy'
      }
    }  
    
  }
}
