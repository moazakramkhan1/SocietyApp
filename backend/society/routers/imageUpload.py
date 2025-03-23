import os
from fastapi import APIRouter, UploadFile, File
from ..workers import imageUpload


UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter(
   tags=["uploads"]
)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
   return imageUpload.upload(file)
