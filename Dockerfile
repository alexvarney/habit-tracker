FROM node:latest

#Create app directory
WORKDIR /usr/src/app

#Bundle app source
COPY . .

#Build the client app
RUN npm install && cd client && npm install && npm run build

#Run the app
CMD ["node", "server.js"]