FROM node:22-alpine3.19

EXPOSE 3000

WORKDIR /user/src/app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "app.js"]
