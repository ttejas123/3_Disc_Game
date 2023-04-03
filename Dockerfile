FROM node:14

WORKDIR /var/app

COPY package.json ./

RUN npm install

COPY . .

ENV DATABASE_URL="file:dev.db" \
    NEXTAUTH_URL="http://localhost:3000" \
    DISCORD_CLIENT_ID="" \
    DISCORD_CLIENT_SECRET=""

RUN npm run postinstall 

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
