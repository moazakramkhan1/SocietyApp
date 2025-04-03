from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from .. import database, schemas
from ..workers import events

router = APIRouter()

@router.post("/events", status_code=status.HTTP_201_CREATED)
def create_event(request: schemas.EventCreate, db: Session = Depends(database.get_db)):
    return events.create_event(request, db)

@router.get("/events", status_code=status.HTTP_200_OK)
def get_events(db: Session = Depends(database.get_db)):
    return events.get_events(db)