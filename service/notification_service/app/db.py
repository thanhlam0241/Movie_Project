# app/db.py
from sqlalchemy import create_engine, MetaData, Column, ForeignKey, Integer, String, DateTime, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timezone, timedelta
import os

SQLALCHEMY_DATABASE_URL = os.environ['DATABASE_URL'] or "postgresql://postgres:fastapi_pass@postgres:5432/notification"

print('Connection string: ', SQLALCHEMY_DATABASE_URL)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, pool_pre_ping=True
)

meta = MetaData()

notifications = Table(
    'notifications', meta, 
    Column('id', Integer, primary_key=True),
    Column('user_id',Integer, index=True),
    Column('send_by',String, index=True),
    Column('timestamp',DateTime, default=lambda: datetime.now()),
    Column('message', String, nullable=False),
)

meta.create_all(engine)

engine.connect()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()