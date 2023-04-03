FROM node:14

WORKDIR /var/app

COPY package.json ./

RUN npm install --loglevel verbose

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
