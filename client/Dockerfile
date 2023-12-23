# Stage 1
FROM node:alpine3.18 as build-stage
WORKDIR /client
COPY package.json .
RUN npm install 
COPY . .

ENV REACT_APP_PORT = http://localhost:9000/
RUN npm run build

# Stage 2
FROM nginx:alpine3.18
COPY --from=build-stage /client/build /usr/share/nginx/html
EXPOSE 80
CMD nginx -g 'daemon off;'
