FROM node:22-alpine3.18
 
WORKDIR /app/video_service

# Install app dependencies
COPY package*.json ./

RUN npm ci
COPY . .

RUN npm run build
COPY . .

EXPOSE 3000

CMD ["node", "build/server.js"]