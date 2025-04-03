from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from .. import database, schemas
from ..workers import announcements

router = APIRouter()

@router.post("/announcements", status_code=status.HTTP_201_CREATED)
def create_announcement(request: schemas.AnnouncementCreate, db: Session = Depends(database.get_db)):
    return announcements.create_announcement(request, db)

@router.get("/announcements", status_code=status.HTTP_200_OK)
def get_announcements(db: Session = Depends(database.get_db)):
    return announcements.get_announcements(db)