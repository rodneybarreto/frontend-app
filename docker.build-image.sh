#!/usr/bin/env sh

## Generate docker image
docker build . -t rodneybarreto/minipets_frontend-app:1.0.0

## Push to docker hub
#docker push rodneybarreto/minipets_frontend-app:1.0.0

## Run container
#docker run --name frontend-app -p 80:80 rodneybarreto/minipets_frontend-app:1.0.0