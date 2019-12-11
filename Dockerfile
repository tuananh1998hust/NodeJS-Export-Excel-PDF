FROM node:10-alpine

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 5000

CMD ["yarn", "start"]