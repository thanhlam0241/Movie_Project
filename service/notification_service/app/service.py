from sqlalchemy.orm import Session

from datetime import datetime

from . import models, schemas

def get_noti(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Notification).filter(models.Notification.user_id == user_id).offset(skip).limit(limit).all()

def create_noti(db: Session, notification: dict):
    db_noti = models.Notification(user_id=notification['user_id']
                ,send_by=notification['send_by'], message=notification['message'], timestamp = datetime.now())
    db.add(db_noti)
    db.commit()
    db.refresh(db_noti)
    return db_noti