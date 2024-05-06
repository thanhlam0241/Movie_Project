docker rm -v $(docker ps --filter status=exited -q)

docker rmi -f $(docker images -aq)

docker compose up -d --build