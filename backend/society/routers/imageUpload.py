import os
from fastapi import APIRouter, UploadFile, File
from ..workers import imageUpload
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
UPLOAD_DIR = BASE_DIR / "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


print(BASE_DIR)



router = APIRouter(
   tags=["uploads"]
)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
   return imageUpload.upload(file)
