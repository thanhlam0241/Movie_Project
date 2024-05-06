FROM node:22-alpine3.18

WORKDIR /usr/src/app/movie_service

# Install app dependencies
COPY package*.json ./

RUN npm ci
COPY . .

RUN npm run build
COPY . .

EXPOSE 8081

CMD ["node", "build/server.js"]