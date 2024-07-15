#!/bin/sh

: ${MONGODB_HOST:=127.0.0.1}
: ${MONGODB_PORT:=27017}

until nc -z mongo 27017
do
    echo "Waiting for Mongo (mongo:27017) to start..."
    sleep 0.5
done

eval $*