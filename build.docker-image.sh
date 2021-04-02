#!/usr/bin/env sh

## Generate docker image
docker build . -t rodneybarreto/minipets_frontend-app:1.1.0

## Push to docker hub
#docker push rodneybarreto/minipets_frontend-app:1.1.0

## Run container
#docker run --name frontend-app --network=host -p 8080:8080 rodneybarreto/minipets_frontend-app:1.1.0