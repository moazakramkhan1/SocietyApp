from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from .. import database, schemas
from ..workers import events

router = APIRouter()

@router.post("/create_events", status_code=status.HTTP_201_CREATED)
def create_event(request: schemas.EventCreate, db: Session = Depends(database.get_db)):
    return events.create_event(request, db)

@router.get("/getAllEvents", status_code=status.HTTP_200_OK)
def get_events(db: Session = Depends(database.get_db)):
    return events.get_events(db)

@router.get("/getEventsOfSociety/{society_id}",status_code=status.HTTP_200_OK)
def getEventsBySociety(society_id,db : Session = Depends(database.get_db)):
    return events.geteventsBySociety(society_id,db)