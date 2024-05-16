docker rm -v $(docker ps --filter status=exited -q)
sleep 3
docker rm -v -f $(docker ps -qa)
sleep 3
docker rmi -f $(docker images -aq)
sleep 3
docker system prune --volumes
sleep 3
docker compose up -d --build