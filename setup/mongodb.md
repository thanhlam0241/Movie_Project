# Pull mongodb from docker hub:
```
docker pull mongo
```

# Run command expose:
```
docker run -d -p 27017:27017 --name mongo-backend mongo:latest
```