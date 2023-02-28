FROM node:18-alpine

RUN mkdir -p /home/app

COPY ./app /home/app

EXPOSE 8080

CMD ["node", "/home/app/server.js"]

