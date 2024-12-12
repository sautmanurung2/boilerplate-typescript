FROM node:latest-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
COPY .env.example .env

EXPOSE 3000
CMD [ "npm", "run", "start" ]