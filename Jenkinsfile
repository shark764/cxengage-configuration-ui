#!groovy​
@Library('sprockets@2.9.2') _

import common
import git
import node
import frontend

def service = 'cxengage-configuration-ui'
def docker_tag = BUILD_TAG.toLowerCase()
def pr = env.CHANGE_ID
def c = new common()
def n = new node()
def f = new frontend()

@NonCPS
def stop_previous_builds(job_name, build_num) {
  def job = Jenkins.instance.getItemByFullName(job_name)
  def new_builds = job.getNewBuilds()

  for (int i = 0; i < new_builds.size(); i++) {
    def build = new_builds.get(i);
    if (build.getNumber().toInteger() != build_num) {
      if (build.isBuilding()) {
        build.doStop()
      }
    }
  }
}

try {
  stop_previous_builds(env.JOB_NAME, env.BUILD_NUMBER.toInteger())
} catch (Exception e) {
  sh "echo ${e}"
}

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
                props = c.exportProperties(buildTool)
                build_version = props.POM_VERSION
                service = props.POM_ARTIFACT_ID
              }
            }
          }
          stage ('Setup Docker') {
            steps {
              sh 'echo "Stage Description: Sets up docker image for use in the next stages"'
              sh "rm -rf build; mkdir build -p"
              sh "docker build -t ${docker_tag} -f Dockerfile ."
              sh "docker run --rm -t -d --name=${docker_tag} ${docker_tag}"
            }
          }
        }
    }
    stage ('Testing') {
      when { changeRequest() }
      parallel {
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
    stage ('Preview PR (dev) and Automation Tests') {
      when { changeRequest() }
      steps {
        sh "echo 'Stage Description: Creates a temp build of the site in dev to review the changes, PR: ${pr}'"
        sh "aws s3 rm s3://frontend-prs.cxengagelabs.net/config2/${pr}/ --recursive"
        sh "aws s3 sync build/build/ s3://frontend-prs.cxengagelabs.net/config2/${pr}/ --delete"
        sh "docker exec ${docker_tag} /bin/bash -c 'export URI=https://frontend-prs.cxengagelabs.net/config2/${pr}/index.html#/ && npm run test:preMerge'"
        script {
          f.invalidate("E23K7T1ARU8K88")
        }
      }
    }
    stage ('Github tagged release') {
      when { anyOf {branch 'master'; branch 'develop'}}
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
    stage ('Create dev build') {
      when { anyOf {branch 'master'}}
      steps {
        sh 'echo "Stage Description: Pushes built app to S3"'
        sh "cp config/dev/config.json build"
        sh "aws s3 sync build/build/ s3://frontend-prs.cxengagelabs.net/dev/builds/config2/${build_version}/ --delete"
      }
    }
    stage ('Create qe build') {
      when { anyOf {branch 'master'}}
      steps {
        sh 'echo "Stage Description: Pushes built app to S3"'
        sh "cp config/qe/config.json build"
        sh "aws s3 sync build/build/ s3://frontend-prs.cxengagelabs.net/qe/builds/config2/${build_version}/ --delete"
      }
    }
    stage ('Save and Publish') {
      when { anyOf {branch 'master'; branch 'develop'}}
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
      when { anyOf {branch 'master'; branch 'develop'}}
      steps {
        build(
        job: 'Deploy - Front-End',
        parameters: [
          [
            $class: 'StringParameterValue',
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
            $class: 'StringParameterValue',
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
    unstable {
        echo 'This will run only if the run was marked as unstable'
    }
    changed {
        echo 'This will run only if the state of the Pipeline has changed'
        echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }
}
