import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .routers import user,Authentication,imageUpload,societies,memeberRequests
from .database import engine
models.Base.metadata.create_all(bind=engine)
app = FastAPI()
current_dir = os.path.dirname(__file__)
uploads_path = os.path.join(current_dir, "uploads")

app.mount("/uploads", StaticFiles(directory=uploads_path), name="uploads")
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)
app.include_router(user.router)
app.include_router(Authentication.router)
app.include_router(imageUpload.router)
app.include_router(societies.router)
app.include_router(memeberRequests.router)