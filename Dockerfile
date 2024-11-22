FROM node:20

WORKDIR /home/node/app

RUN apt-get -y update \
    && apt-get -y upgrade \
    && apt-get install -y cron \
    && apt-get clean

COPY package*.json ./
COPY .env.example ./.env
COPY . .

RUN chmod +x run.sh
COPY Crontab /etc/cron.d/

RUN npm i \
    && npm run build

CMD [ "cron", "&&", "tail", "-f", "/var/log/cron.log" ]