FROM node:latest

WORKDIR /home/node/app
COPY . .

EXPOSE 3000

RUN npm install
CMD ["node", "server.js"]