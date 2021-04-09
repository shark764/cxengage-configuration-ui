FROM node:10.15.3

RUN mkdir /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

COPY . /home/node/app
RUN chown -R node /home/node/app

RUN usermod -u 106 node

USER node
WORKDIR /home/node/app

ENV APP=config2
ENV REGIONVAR=us-east-1
ENV ENVIRONMENT=qe
ENV TENANT=AUTOMATION_CONFIG2
ENV CX_TENANT_ID=6b829813-266e-4717-b04a-4943028eaa06
ENV CX_USERNAME=cxselenium+eb655cccl71bel4a4fla18fldde419b1fd0a@gmail.com
ENV CX_PASSWORD=selenium1!
ENV TEST_BROWSER=chrome
ENV HEADLESS=false
ENV HOST=resources-selenium-cluster.cxengagelabs.net
ENV PORT=4444
ENV MAX_INSTANCES=1
ENV VERBOSELOGS=true
ENV LOCAL_HOST=false
ENV LOCAL_HOST_PORT=3000
ENV TESTS_TO_RUN=all

RUN npm install
