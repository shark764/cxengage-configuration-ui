#!groovy​
@Library('sprockets@2.1.0') _

import common
import git
import hipchat
import node
import frontend

def service = 'cxengage-configuration-ui'
def docker_tag = BUILD_TAG.toLowerCase()
def pr = env.CHANGE_ID
def c = new common()
def h = new hipchat()
def n = new node()
def f = new frontend()

node(){
  pwd = pwd()
}

pipeline {
  agent any
  stages {
    stage ('Setup') {
      parallel {
        stage ('Set build version') {
            steps {
              sh 'echo "Stage Description: Set build version from package.json"'
              script {
                n.export()
                build_version = readFile('version')
              }
            }
          }
          stage ('Setup Docker') {
            steps {
              sh 'echo "Stage Description: Sets up docker image for use in the next stages"'
              sh "mkdir build -p"
              sh "docker build -t ${docker_tag} -f Dockerfile ."
              sh "docker run --rm -t -d --name=${docker_tag} ${docker_tag}"
            }
          }
        }
    }
    stage ('Testing') {
      when { changeRequest() }
      parallel {
        stage('Automated Tests') {
          steps {
            sh 'echo "Stage Description: Runs automation tests and fails if any single test fails"'
            script {
              try {
                sh "docker exec ${docker_tag} npm run test:all"
              } catch (e) {
                hipchatSend(color: 'YELLOW',
                    credentialId: 'HipChat-API-Token',
                    message: "<b>${service} PR${pr}</b> <br/>Automated tests Failing!<br/><a href=\"http://jenkins.cxengagelabs.net/blue/organizations/jenkins/Serenova%2F${service}/activity\">Build Activity</a><br/><a href=\"https://github.com/SerenovaLLC/${service}/pull/${pr}\">Pull Request</a>",
                    notify: true,
                    room: 'Admin/Supervisor Experience',
                    sendAs: 'Jenkins',
                    server: 'api.hipchat.com',
                    textFormat: false,
                    v2enabled: false)
              }
            }
          }
        }
        stage('Lint for errors') {
            steps {
                sh 'echo "Stage Description: Lints the project for common js errors and formatting"'
                sh "docker exec ${docker_tag} npm run lint"
            }
        }
        stage('Unit Tests') {
            steps {
                sh 'echo "Stage Description: Runs unit tests and fails if they do not meet coverage expectations"'
                sh "docker exec ${docker_tag} npm run test:coverage"
                sh "docker cp ${docker_tag}:/home/node/app/junit.xml build"
                junit 'build/junit.xml'
            }
        }
      }
    }
    stage ('Build') {
      steps {
        sh 'echo "Stage Description: Builds the production version of the app"'
        sh "docker exec ${docker_tag} npm run build"
        sh "docker cp ${docker_tag}:/home/node/app/build build"
      }
    }
    stage ('Github tagged release') {
      when { anyOf {branch 'master'}}
      steps {
        sh 'echo "Makes a github tagged release under a new branch with the same name as the tag version"'
        git url: "git@github.com:SerenovaLLC/${service}"
        sh "git checkout -b build-${BUILD_TAG}"
        script {
          if (build_version.contains("SNAPSHOT")) {
            sh "if git tag --list | grep ${build_version}; then git tag -d ${build_version}; git push origin :refs/tags/${build_version}; fi"
          }
        }
        sh "git tag -a ${build_version} -m 'release ${build_version}, Jenkins tagged ${BUILD_TAG}'"
        sh "git push origin ${build_version}"
      }
    }
    stage ('Save and Publish') {
      when { anyOf {branch 'master'}}
      parallel {
        stage ('Publish specs to npm') {
          steps {
            sh 'echo "Stage Description: Publishes the automation folder to npm so you can run the tests from other projects"'
            sh "docker exec ${docker_tag} npm publish"
          }
        }
        stage ('Store in S3') {
          steps {
            sh 'echo "Stage Description: Syncs a copy of the build folder to > s3://cxengagelabs-jenkins/frontend/{{service}}/{{version}}/"'
            sh "aws s3 sync ./build/build s3://cxengagelabs-jenkins/frontend/${service}/${build_version}/ --delete"
          }
        }
      }
    }
    stage ('Deploy to Dev') {
      when { anyOf {branch 'master'}}
      steps {
        build(
        job: 'Deploy%20-%20Front-End',
        parameters: [
          [
            $class: 'ActiveChoicesParameterValue',
            name: 'Service',
            value: "Config-UI2",
          ],
          [
            $class: 'StringParameterValue',
            name: 'RefreshRate',
            value: "9000",
          ],
          [
            $class: 'StringParameterValue',
            name: 'Version',
            value: build_version,
          ],
          [
            $class: 'ActiveChoicesParameterValue',
            name: 'Environment',
            value: 'dev',
          ],
          [
            $class: 'BooleanParameterValue',
            name: 'blastSqsOutput',
            value: true,
          ],
          [
            $class: 'StringParameterValue',
            name: 'logLevel',
            value: 'debug',
          ],
        ],
      )
      }
    }
  }
  post {
    always {
      sh "docker rmi ${docker_tag} --force"
      script {
        c.cleanup()
      }
    }
    success {
      script {
        def jobType = 'hipchat message goes here based on jenkins job type'
        def notifyPpl = 'ppl to @ in hipchat that should action this notification'
        if (env.BRANCH_NAME == "master") {
          jobType = "Merged PR successfully built and deployed to dev, ready to be tested"
          notifyPpl = "@JWilliams @RDominguez"
        } else {
          jobType = "PR was linted, unit tested, built and is ready for code review"
          notifyPpl = "@nick @DHernandez @mjones @RandhalRamirez  ^^^^"
        }
        hipchatSend(color: 'GREEN',
                    credentialId: 'HipChat-API-Token',
                    message: "<b>${service} PR${pr} | ${jobType}</b><br/><a href=\"http://jenkins.cxengagelabs.net/blue/organizations/jenkins/Serenova%2F${service}/activity\">Build Activity</a><br/><a href=\"https://github.com/SerenovaLLC/${service}/pull/${pr}\">Pull Request</a>",
                    notify: true,
                    room: 'Admin/Supervisor Experience',
                    sendAs: 'Jenkins',
                    server: 'api.hipchat.com',
                    textFormat: false,
                    v2enabled: false)
        hipchatSend(credentialId: 'HipChat-API-Token',
                    message: "${notifyPpl}",
                    notify: true,
                    room: 'Admin/Supervisor Experience',
                    sendAs: 'Jenkins',
                    server: 'api.hipchat.com',
                    textFormat: true,
                    v2enabled: false)
      }
    }
    failure {
      script {
        hipchatSend(color: 'RED',
                    credentialId: 'HipChat-API-Token',
                    message: "<b>${service}#${pr} - Failed! </b><br/><a href=\"http://jenkins.cxengagelabs.net/blue/organizations/jenkins/Serenova%2F${service}/activity\">Build Activity</a>",
                    notify: true,
                    room: 'Admin/Supervisor Experience',
                    sendAs: 'Jenkins',
                    server: 'api.hipchat.com',
                    textFormat: false,
                    v2enabled: false)
      }
    }
    unstable {
        echo 'This will run only if the run was marked as unstable'
    }
    changed {
        echo 'This will run only if the state of the Pipeline has changed'
        echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }
}
