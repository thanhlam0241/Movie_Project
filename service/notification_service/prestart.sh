# prestart.sh

echo "Waiting for postgres connection"

while ! nc -z 127.0.0.1 5432; do
    sleep 0.1
done

echo "PostgreSQL started"

exec "$@"

export DATABASE_URL=postgresql://postgres:password@127.0.0.1/notification

uvicorn main:app --host 0.0.0.0 --port 8086 --reload