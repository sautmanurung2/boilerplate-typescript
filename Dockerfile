FROM node:latest-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
COPY .env.example .env

RUN npm run build

RUN npm run start

EXPOSE 3000
CMD [ "npm", "run", "start" ]