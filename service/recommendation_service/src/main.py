import sys
sys.path.insert(0, '..')

from fastapi import FastAPI, Request, Body, HTTPException, status
from fastapi.responses import PlainTextResponse
from src.data_loader import DataLoader
from src.predict import Predict
from src.mongo_db import MongoDb
from src.entity import MovieRecommendationCollection

app = FastAPI( 
    title="Recommendation API",
    summary="A sample application showing how to use FastAPI to add a ReST API to a MongoDB collection.",
)

mongo_db = MongoDb()
loader = DataLoader(mongo_db)
predict = Predict(loader, mongo_db)

@app.get("/")
def home():
    return "Hello World"

@app.get("/hello", 
    response_description="Test get db collection",
    status_code=status.HTTP_200_OK,
    response_model_by_alias=False,
)
async def home():
    data = mongo_db.retrieve_topK_user_behaviors(2)
    return data

@app.get("/test", 
    response_description="Test get db",
    status_code=status.HTTP_200_OK,
    response_model=MovieRecommendationCollection,
    response_model_by_alias=False,
)
async def home():
    data = mongo_db.retrieve_topK_user_behaviors(2, 10)
    return MovieRecommendationCollection(data = data)

@app.get("/recommend/{user_id}", 
    response_description="Test get db",
    status_code=status.HTTP_200_OK,
    response_model=MovieRecommendationCollection,
    response_model_by_alias=False,
)
def recommend(user_id: int):
    result = predict.predict_user(user_id)
    return MovieRecommendationCollection(data = result)

@app.exception_handler(Exception)
def validation_exception_handler(request, exc):
    print(str(exc))
    return PlainTextResponse("Something went wrong", status_code=400)