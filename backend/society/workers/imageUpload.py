from fastapi.responses import JSONResponse
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
        file_url = f"http://localhost:8000/uploads/{new_filename}"
        return {"fileUrl": file_url}

    except Exception as e:
        print("Upload error:", e)
        return JSONResponse(content={"error": "File upload failed."}, status_code=500)