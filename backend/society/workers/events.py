from sqlalchemy.orm import Session
from ..models import Event
from ..schemas import EventCreate

def create_event(request: EventCreate, db: Session):
    new_event = Event(**request.dict())
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

def get_events(db: Session):
    return db.query(Event).all()