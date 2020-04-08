pipeline {
  agent any
  stages {
    stage('fetchGit') {
      steps {
        git(url: 'https://github.com/klassecloud/backend.git', branch: 'master')
      }
    }

    stage('build') {
      agent any
      environment {
        nodejs = 'npm'
      }
      steps {
        sh 'npm install'
        sh 'npm build'
      }
    }

  }
}