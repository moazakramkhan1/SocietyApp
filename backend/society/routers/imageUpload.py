import os
from fastapi import APIRouter, UploadFile, File
from ..workers import imageUpload
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
UPLOAD_DIR = BASE_DIR / "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

router = APIRouter(
   tags=["uploads"]
)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
   return imageUpload.upload(file)

@router.delete("/deleteImage/{filename}")
async def delete_image(filename: str,UPLOAD_DIR:Path):
   return imageUpload.deleteImage(filename,UPLOAD_DIR)

