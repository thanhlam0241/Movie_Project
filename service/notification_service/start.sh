docker stop $(docker ps -qa) && docker rm $(docker ps -qa) && docker volume rm $(docker volume ls -q)

docker compose up -d