from typing import Union, List
from sqlalchemy.orm import Session
from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import HTMLResponse

from . import service, models, schemas
from .db import SessionLocal, engine

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
async def generate_item(db: Session = Depends(get_db)):
    return service.create_noti(db=db, notification={'user_id': 1,'send_by':"Hello",'message':"Hello World"})

@app.post("/notifications/", response_model=schemas.Notification_Create)
async def create_notification(noti: schemas.Notification_Create, db: Session = Depends(get_db)):
    return service.create_noti(db=db, notification=noti)

@app.get("/notifications/{user_id}", response_model=List[schemas.Notification_Schema])
async def read_noti(user_id: int, db: Session = Depends(get_db)):
    db_notis = service.get_noti(db, user_id=user_id)
    if db_notis is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_notis