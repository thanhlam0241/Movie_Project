# remove all docker container:

docker rm -v $(docker ps --filter status=exited -q)
docker rm -v -f $(docker ps -qa)

# remove all docker images:

docker rmi -f $(docker images -aq)
