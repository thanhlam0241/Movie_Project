FROM node:22-alpine3.18
 
WORKDIR /app/account_service

# Install app dependencies
COPY package*.json ./

RUN npm ci
COPY . .

CMD ["node", "server"]
