FROM node:20

WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN npm install


CMD ["/bin/sh", "./app/scripts/deploy.sh"]