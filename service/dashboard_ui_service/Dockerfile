FROM node:21-alpine

WORKDIR /app/dashboard_ui_service

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8084

CMD ["npm", "start"]