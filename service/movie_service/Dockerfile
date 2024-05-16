FROM node:22-alpine3.18
 
WORKDIR /app/movie_service

# Install app dependencies
COPY package*.json ./

RUN npm ci
COPY . .

RUN npm run build
COPY . .

CMD ["node", "build/server.js"]