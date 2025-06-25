FROM node:20-alpine
COPY . .
RUN npm ci
EXPOSE 5173
CMD ["npm", "run", "dev"]