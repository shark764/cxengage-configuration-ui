#!/bin/bash
set -e
npm install
npm ls react
npm run lint
npm run test:coverage
npm run build
#mv app/assets/favicons/favicon.ico build/favicon.ico

cd ..
cp -r app/build/* mount
