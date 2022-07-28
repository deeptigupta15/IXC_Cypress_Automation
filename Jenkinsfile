pipeline{
    agent {
        docker {
            reuseNode true
            image 'node:16.15'
        }
    }
    
    environment {
        // Override HOME to WORKSPACE
        HOME = "${WORKSPACE}"
        // or override default cache directory (~/.npm)
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
    }
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
              bat "npm install"
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