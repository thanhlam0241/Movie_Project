from fastapi import FastAPI, Request
from use import getRecommendOfUser
import argparse
from data_loader import load_data
import numpy as np
from config import get_param

app = FastAPI()

@app.get("/")
def home(request: Request):
    return "Hello World"

@app.get("/recommend/{user_id}")
def recommend(user_id: int):
    args = get_param()
    data_info = load_data(args)
    return getRecommendOfUser(args, data_info, user_id)

@app.exception_handler(Exception)
async def validation_exception_handler(request, exc):
    print(str(exc))
    return PlainTextResponse("Something went wrong", status_code=400)