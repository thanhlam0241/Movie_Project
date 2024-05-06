docker rm -v $(docker ps --filter status=exited -q)
sleep 5
docker rm -v -f $(docker ps -qa)
sleep 5
docker rmi -f $(docker images -aq)

# docker compose up -d --build