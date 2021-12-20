FROM node:alpine


RUN mkdir -p /var/www/app


WORKDIR /var/www/app

COPY . /var/www/app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
