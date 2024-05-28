FROM node:22-alpine3.18
 
WORKDIR /app/communication_service

# Install app dependencies
COPY package*.json ./
RUN npm ci
COPY . .

CMD ["node", "server"]
