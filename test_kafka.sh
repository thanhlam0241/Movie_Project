docker rm -v $(docker ps --filter status=exited -q)
docker rm -v -f $(docker ps -qa)
docker rmi -f $(docker images -aq)
docker system prune -f --volumes
docker compose -f compose.db.yml -f compose.message.yml up