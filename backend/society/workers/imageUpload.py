from fastapi import HTTPException
from fastapi.responses import JSONResponse
from pathlib import Path
import os
import shutil
from datetime import datetime
from fastapi import UploadFile
from ..routers import imageUpload
def upload(file:UploadFile):
    try:
        timestamp = int(datetime.now().timestamp())
        new_filename = f"{timestamp}-{file.filename}"
        file_location = os.path.join(imageUpload.UPLOAD_DIR, new_filename)
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        file_url = f"uploads/{new_filename}"
        return {"fileUrl": file_url}

    except Exception as e:
        print("Upload error:", e)
        return JSONResponse(content={"error": "File upload failed."}, status_code=500)
    

def deleteImage(filename: str, UPLOAD_DIR: Path):
    full_path = UPLOAD_DIR / filename
    try:
        full_path = full_path.resolve(strict=False)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid file path")

    if not full_path.exists():
        raise HTTPException(status_code=404, detail="File not found")

    if UPLOAD_DIR not in full_path.parents:
        raise HTTPException(status_code=403, detail="Unauthorized file access")

    full_path.unlink()
    return {"message": f"{filename} deleted successfully."}
