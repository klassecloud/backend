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
      steps {
        sh 'npm install'
        sh 'npm build'
      }
    }

  }
}