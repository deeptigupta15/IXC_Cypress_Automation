pipeline{
    agent any

 environment {
       nodejs = 'C:/Users/deepti.gupta/Application Data/npm/node_modules'

    parameters{
        string(name: 'SPEC', defaultValue:"cypress/integration/**/**", description:"Enter the path")
        choice(name: 'BROWSER', choices:['chrome','edge','firefox'], description:"Chose the browser")
    }


    options{
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }

    stages{
        stage('Building'){
         steps{
             echo "Building..."
         }
        }
        stage('Testing'){
            steps{
              bat label: 'nodejs', script: 'npm install'
              bat "npx cypress run --browser ${BROWSER} --spec ${SPEC}"
          }
        }
    
        stage('Deploying'){
            steps{
                echo "Deploying..."
            }
        }
    }

    post{
        always{
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: '', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])
        }
    }
}