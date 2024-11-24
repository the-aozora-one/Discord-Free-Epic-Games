# Free Epic Games for Discord

## Install

### Manual

1. Clone this repo.
1. Copy `.env.example` to `.env`.
1. Add your credentials to `.env`.
1. Run these commands:
    ```bash
    # Install all node dependencies
    npm i
    # Compile the Typescript files
    npm run build
    # Run the application
    npm run start
    ```
    `npm run start` will only run the app once.
    If you want the app to work properly, you'll want to schedule it to run consistently.
    I prefer to have it run everyday at 16:15 UTC since the new free games are:
    1. Updated at 16:00 UTC and the extra fifteen minutes gives time for the update in case it goes slowly on their end.
    1. Sometimes there will be new free games for a limited amount of time outside of their usual week-long period (typically around the holidays).
    If you are using Linux, you can schedule a cronjob, and if you are on Windows, you can use the Task Scheduler.

### Docker

```bash
docker pull username/discord-free-epic-games
docker container create --name discord-free-epic-games username/discord-free-epic-games
```
Copy `.env.example` to your host machine and modify it with your credentials before copying back into the Docker container.
```bash
docker cp discord-free-epic-games:/home/node/app/.env. /host/path/to/file/discord-free-epic-games.env

docker cp /host/path/to/file/discord-free-epic-games.env discord-free-epic-games:/home/node/app/.env
```

Start up your container and add `run.sh` as a cronjob
```bash
docker start discord-free-epic-games
docker exec -it discord-free-epic-games /bin/bash
crontab -e
```

## Building

```bash
docker build -t username/discord-free-epic-games --platform linux/arm64 .
docker push username/discord-free-epic-games
```
