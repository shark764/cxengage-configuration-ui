FROM node:8.11.3

RUN mkdir /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

COPY . /home/node/app
RUN chown -R node /home/node/app

RUN usermod -u 106 node

USER node
WORKDIR /home/node/app

ENV TENANT=selenium
ENV PORT=4444
ENV REGIONVAR=us-east-1
ENV ENVIRONMENT=dev
ENV HOST=resources-selenium.cxengagelabs.net

RUN npm install
