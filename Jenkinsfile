#!groovy​
@Library('sprockets@2.1.0') _

import common
import git
import hipchat
import node
import frontend

def service = 'cxengage-configuration-ui'
def docker_tag = BUILD_TAG.toLowerCase()
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
        sh "docker run --rm -t -d --name=${docker_tag} --mount type=bind,src=$HOME/.ssh,dst=/home/node/.ssh,readonly --mount type=bind,src=${pwd}/build,dst=/home/node/mount ${docker_tag}"
        sh "docker cp ${docker_tag}:/home/node/app/build build"
      }
    }
    stage ('Lint for errors') {
      when { changeRequest() }
      steps {
        sh 'echo "Stage Description: Lints the project for common js errors and formatting"'
        sh "docker exec ${docker_tag} npm run lint"
      }
    }
    stage ('Unit Tests') {
      when { changeRequest() }
      steps {
        sh 'echo "Stage Description: Runs unit tests and fails if they do not meet coverage expectations"'
        sh "docker ps"
        sh "docker exec ${docker_tag} npm run test:coverage"
        sh "docker exec ${docker_tag} ls"
        sh "docker cp ${docker_tag}:/home/node/app/junit.xml build"
      }
    }
    stage ('Github tagged release') {
      when { anyOf {branch 'master'; branch 'develop'; branch 'release'; branch 'hotfix'}}
      steps {
        sh "Makes a github tagged release under a new branch with the same name as the tag version"
        git url: "git@github.com:SerenovaLLC/${service}"
        sh 'git checkout -b build-${BUILD_TAG}'
        sh 'git add -f build/* '
        sh "git commit -m 'release ${build_version}'"
        script {
          if (build_version.contains("SNAPSHOT")) {
            sh "if git tag --list | grep ${build_version}; then git tag -d ${build_version}; git push origin :refs/tags/${build_version}; fi"
          }
        }
        sh "git tag -a ${build_version} -m 'release ${build_version}, Jenkins tagged ${BUILD_TAG}'"
        sh "git push origin ${build_version}"
      }
    }
    stage ('Store in S3') {
      when { anyOf {branch 'master'; branch 'develop'; branch 'release'; branch 'hotfix'}}
      steps {
        sh "Stage Description: Syncs a copy of the build folder to > s3://cxengagelabs-jenkins/frontend/{{service}}/{{version}}/"
        script {
          n.push("${service}", "${build_version}")
        }
      }
    }
    stage ('Deploy') {
      when { anyOf {branch 'master'; branch 'develop'; branch 'release'; branch 'hotfix'}}
      steps {
        script {
          f.pull("${service}", "${build_version}") // pull down version of site from s3
          f.versionFile("${build_version}") // make version file
          f.confFile("dev", "${build_version}") // make conf file
          f.deploy("dev","config2") // push to s3
          f.invalidate("E3MJXQEHZTM4FB") // invalidate cloudfront
          h.hipchatDeployServiceSuccess("${service}", "dev", "${build_version}", "${env.BUILD_USER}")
        }
      }
    }
  }
  post {
    always {
      sh "docker rmi ${docker_tag} --force"
      junit 'build/junit.xml'
      script {
        c.cleanup()
      }
    }
    success {
        script {
          h.hipchatPullRequestSuccess("${service}", "${build_version}")
        }
    }
    failure {
      script {
        h.hipchatPullRequestFailure("${service}", "${build_version}")
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
