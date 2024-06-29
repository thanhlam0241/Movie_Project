import redis

def connectRedis():
    r = redis.Redis(
        host='redis-11146.c299.asia-northeast1-1.gce.redns.redis-cloud.com',
        port=11146,
        password='Hoatuyet_0241'
    )
    return r