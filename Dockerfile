FROM node:18

WORKDIR /app

COPY package*.jason ./

RUN npm install

COPY . . 

EXPOSE 3000

CMD ["node", "index.js"]