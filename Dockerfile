FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm start build

COPY . .

CMD ["npm", "run", "start:dev"]