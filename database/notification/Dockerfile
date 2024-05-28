FROM postgres:latest

ENV POSTGRES_PASSWORD password

EXPOSE 5432

COPY *.sql /docker-entrypoint-initdb.d/