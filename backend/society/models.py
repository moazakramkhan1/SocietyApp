from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship, Session
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String)
    phonenumber = Column(String, nullable=True)
    designation = Column(String, nullable=True, default='Member')
    department = Column(String, nullable=True, default='NA')
    password = Column(String)
    role = Column(String)
    image = Column(String, nullable=True)
    
    memberships = relationship("Membership", back_populates="user", overlaps="user,societies")
    administered_societies = relationship("Society", back_populates="admin_user", overlaps="admin_user")
    societies = relationship("Society", secondary="memberships", back_populates="members", overlaps="memberships,user")
    executive_memberships = relationship("ExecutiveMembership", back_populates="user", overlaps="user")
    requests = relationship("Request", back_populates="user", overlaps="user")
    notifications = relationship("Notification", back_populates="user", overlaps="user")


class Society(Base):
    __tablename__ = "societies"
    
    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    description = Column(String)
    num_members = Column(Integer, default=1)
    image = Column(String, nullable=True)

    admin_user = relationship("User", back_populates="administered_societies", overlaps="administered_societies")
    memberships = relationship("Membership", back_populates="society", overlaps="society,members")
    members = relationship("User", secondary="memberships", back_populates="societies", overlaps="memberships,society")
    executive_memberships = relationship("ExecutiveMembership", back_populates="society", overlaps="society")
    events = relationship("Event", back_populates="society", overlaps="society")
    requests = relationship("Request", back_populates="society", overlaps="society")
    announcements = relationship("Announcement", back_populates="society", overlaps="society")


class Membership(Base):
    __tablename__ = "memberships"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    society_id = Column(Integer, ForeignKey("societies.id"))
    role = Column(String)

    user = relationship("User", back_populates="memberships", overlaps="societies,user")
    society = relationship("Society", back_populates="memberships", overlaps="members,society")


class ExecutiveMembership(Base):
    __tablename__ = "executive_memberships"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    society_id = Column(Integer, ForeignKey("societies.id"))
    designation = Column(String)
    
    user = relationship("User", back_populates="executive_memberships", overlaps="user")
    society = relationship("Society", back_populates="executive_memberships", overlaps="society")


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    logo = Column(String, nullable=True)
    date = Column(DateTime, nullable=False)
    society_id = Column(Integer, ForeignKey("societies.id"), nullable=False)

    society = relationship("Society", back_populates="events", overlaps="events")


class Announcement(Base):
    __tablename__ = "announcements"
    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String, nullable=False)
    body = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    society_id = Column(Integer, ForeignKey("societies.id"), nullable=False)

    society = relationship("Society", back_populates="announcements", overlaps="announcements")


class Request(Base):
    __tablename__ = 'requests' 

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    society_id = Column(Integer, ForeignKey("societies.id"))
    user_email = Column(String)
    user_designation = Column(String)
    user_department = Column(String)
    status = Column(String, default='pending')
    image = Column(String)
    society_name = Column(String)

    user = relationship("User", back_populates="requests", overlaps="requests")
    society = relationship("Society", back_populates="requests", overlaps="requests")

    def __init__(self, user_id, society_id, session: Session, **kwargs):
        super().__init__(**kwargs)
        self.user_id = user_id
        self.society_id = society_id

        if session:
            user = session.query(User).filter_by(id=user_id).first()
            if user:
                self.user_email = user.email or ""
                self.user_designation = user.designation or "Member"
                self.user_department = user.department or "NA"
                self.image = user.image or ""

            society = session.query(Society).filter_by(id=society_id).first()
            if society:
                self.society_name = society.name or ""


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(String)
    is_read = Column(Integer, default=0) 

    user = relationship("User", back_populates="notifications", overlaps="notifications")
