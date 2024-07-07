import redis

def connectRedis():
    try:
        r = redis.Redis(
            host='redis-11146.c299.asia-northeast1-1.gce.redns.redis-cloud.com',
            port=11146,
            username="movieredis",
            password='Hoatuyet_0241'
        )
        print("Connect to redis successfully!")
        return r
    except Exception as ex:
        print("Exeption while connect to redis!", ex)