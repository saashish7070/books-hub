FROM node:alpine3.18
WORKDIR /backend
COPY package.json .
RUN npm install
COPY . .
CMD npm start
