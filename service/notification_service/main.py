from typing import Union, List
from sqlalchemy.orm import Session
from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import HTMLResponse

from app import service, models, schemas
from app.db import SessionLocal, engine
from app.firebase import sendMessageToTopic

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/", response_class=HTMLResponse)
def healthcheck():
    return "<h1>All good! Hello World</h2>"

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/g")
def generate_item(db: Session = Depends(get_db)):
    return service.create_noti(db=db, notification={'user_id': 1,'send_by':"Hello",'message':"Hello World"})

@app.get("/message")
def send_message(message: str = 'new message', topic: str = 'topic', send_by: str = 'notification-server' , db: Session = Depends(get_db)):
    data = {
        "message": message,
        "send_by": send_by
    }
    sendMessageToTopic(data, topic)
    return service.create_noti(db=db, notification={'user_id': 1,'send_by':"Hello",'message':"Hello World"})

@app.post("/notifications/", response_model=schemas.Notification_Create)
def create_notification(noti: schemas.Notification_Create, db: Session = Depends(get_db)):
    return service.create_noti(db=db, notification=noti)

@app.get("/notifications/{user_id}", response_model=List[schemas.Notification_Schema])
def read_noti(user_id: int, db: Session = Depends(get_db)):
    db_notis = service.get_noti(db, user_id=user_id)
    if db_notis is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_notis