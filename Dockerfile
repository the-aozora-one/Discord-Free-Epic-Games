FROM node:20

WORKDIR /home/node/app

RUN apt-get -y update \
    && apt-get -y upgrade \
    && apt-get install -y cron \
    && apt-get clean

COPY package*.json ./
COPY .env.example ./.env
COPY . .

RUN chmod +x run.sh \
    crontab -l > temp-cron \
    echo "15 10 * * * /home/node/app/run.sh" >> temp-cron \
    crontab temp-cron \
    rm temp-cron \
    npm i \
    && npm run build

CMD [ "cron", "&&", "tail", "-f", "/var/log/cron.log" ]