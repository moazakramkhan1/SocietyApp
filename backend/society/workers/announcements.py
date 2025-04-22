from sqlalchemy.orm import Session
from ..models import Announcement
from ..schemas import AnnouncementCreate

def create_announcement(request: AnnouncementCreate, db: Session):
    new_announcement = Announcement(
        subject = request.subject,
        body = request.body,
        society_id = request.society_id
    )
    db.add(new_announcement)
    db.commit()
    db.refresh(new_announcement)
    return new_announcement

def get_announcements(db: Session):
    return db.query(Announcement).all()