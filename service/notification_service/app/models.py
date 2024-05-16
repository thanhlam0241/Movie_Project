from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Table
from sqlalchemy.orm import relationship
from datetime import datetime

from .db import Base, meta



class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, index=True)
    send_by = Column(String, index=True)
    timestamp= Column(DateTime, default=lambda: datetime.now())
    message = Column(String, nullable=False)
