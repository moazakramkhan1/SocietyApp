from sqlalchemy.orm import Session
from ..models import Event
from ..schemas import EventCreate

def create_event(request: EventCreate, db: Session):
    # Validate required fields
    if not all([request.name, request.description, request.date, request.society_id]):
        raise ValueError("Missing required fields: name, description, date, or society_id")
    
    new_event = Event(
        name=request.name,
        description=request.description,
        logo=request.logo,
        date=request.date,
        society_id=request.society_id
    )
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

def get_events(db: Session):
    return db.query(Event).all()

def geteventsBySociety(society_id : int,db:Session):
    events = db.query(Event).filter(Event.society_id == society_id).all()
    return events
