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
ENV ENVIRONMENT=dev
ENV TENANT=Anil
ENV CX_TENANT_ID=c965588e-6551-472a-952d-d712c1c307c7
ENV CX_USERNAME=jwilliams@serenova.com
ENV CX_PASSWORD=Password1!
ENV TEST_BROWSER=chrome
ENV HEADLESS=false
ENV HOST=resources-selenium.cxengagelabs.net
ENV PORT=4444
ENV MAX_INSTANCES=1
ENV VERBOSELOGS=true
ENV LOCAL_HOST=false
ENV LOCAL_HOST_PORT=3000
ENV TESTS_TO_RUN=all

RUN npm install
