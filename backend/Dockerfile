FROM node:20

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]