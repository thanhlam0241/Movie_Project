from pydantic import BaseModel
from datetime import datetime
from typing import Union

class Notification_Schema(BaseModel):
    id: int
    user_id: int
    send_by: str
    message: str
    timestamp: datetime

class Notification_Create(BaseModel):
    user_id: int
    send_by: str
    message: str

    def __init__(self, user_id, send_by, message):
      self.user_id = user_id
      self.send_by = send_by
      self.message = message
