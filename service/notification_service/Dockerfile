FROM python:3.8

WORKDIR /app/notification_service

RUN apt-get update && apt-get install -y netcat-traditional

# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirement.txt .

RUN pip install -r requirement.txt

COPY . .

RUN chmod +x prestart.sh

EXPOSE 2792

CMD ["/bin/sh", "prestart.sh"]