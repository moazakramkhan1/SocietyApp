from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .routers import user,Authentication
from .database import engine
models.Base.metadata.create_all(bind=engine)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins='http://localhost:5173', 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)
app.include_router(user.router)
app.include_router(Authentication.router)