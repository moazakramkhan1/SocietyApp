import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .routers import user,Authentication,imageUpload,societies,memeberRequests,announcements,events
from .database import engine
models.Base.metadata.create_all(bind=engine)
app = FastAPI(debug=True)
 
uploads_path = os.path.join(os.path.dirname(__file__), "..", "uploads")
uploads_path = os.path.abspath(uploads_path) 
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
app.include_router(announcements.router)
app.include_router(events.router)