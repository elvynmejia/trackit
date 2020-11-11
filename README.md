nodeenv env
. env/bin/activate
env/bin/npm install package.json
env/bin/npm start


env/bin/node v1/proxy.js

CHOKIDAR_USEPOLLING=true npm start