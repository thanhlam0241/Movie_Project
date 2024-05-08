FROM node:21-alpine

WORKDIR /app/client_ui

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8082

CMD ["npm", "run", "preview"]