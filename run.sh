#!/bin/bash
date +"[%c] Starting search for new games..." >> /home/node/app/log.txt
node dist/index.js
date +"[%c] Search complete!" >> /home/node/app/log.txt