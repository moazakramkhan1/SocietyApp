from sqlalchemy import Column, Integer, String, ForeignKey,Date,Time
from sqlalchemy.orm import relationship, Session
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String)
    phonenumber = Column(String, nullable=True)
    designation = Column(String, nullable=True,default='Member')
    department = Column(String, nullable=True,default='NA')
    password = Column(String)
    confirmpassword = Column(String)
    role = Column(String)
    image = Column(String, nullable=True)
    
    memberships = relationship("Membership", back_populates="user", overlaps="societies")
    administered_societies = relationship("Societies", back_populates="admin_user")
    
    societies = relationship("Societies", secondary="memberships", back_populates="members", overlaps="memberships")
    executive_memberships = relationship("ExecutiveMembership", back_populates="user")
    requests = relationship("Requests", back_populates="user")

class Societies(Base):
    __tablename__ = "Societies"
    
    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    description = Column(String)
    num_members = Column(Integer, default=1)
    image = Column(String, nullable=True)

    admin_user = relationship("User", back_populates="administered_societies")
    memberships = relationship("Membership", back_populates="society", overlaps="members")
    
    members = relationship("User", secondary="memberships", back_populates="societies", overlaps="memberships")
    executive_memberships = relationship("ExecutiveMembership", back_populates="society")
    events = relationship("Events", back_populates="society")
    requests = relationship("Requests", back_populates="society")



class Membership(Base):
    __tablename__ = "memberships"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    society_id = Column(Integer, ForeignKey("Societies.id"))
    role = Column(String)

    user = relationship("User", back_populates="memberships", overlaps="societies")
    society = relationship("Societies", back_populates="memberships", overlaps="members")

class ExecutiveMembership(Base):
    __tablename__ = "executive_memberships"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    society_id = Column(Integer, ForeignKey("Societies.id"))
    designation = Column(String)
    
    user = relationship("User", back_populates="executive_memberships")
    society = relationship("Societies", back_populates="executive_memberships")


class Events(Base):
    __tablename__ = 'events'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    society_id = Column(Integer, ForeignKey("Societies.id"))
    society = relationship("Societies", back_populates="events")


class Requests(Base):
    __tablename__ = 'requests' 
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    society_id = Column(Integer, ForeignKey("Societies.id"))
    user_email = Column(String)
    user_designation = Column(String)
    user_department = Column(String)
    status = Column(String, default='pending')
    image = Column(String)

    user = relationship("User", back_populates="requests")
    society = relationship("Societies", back_populates="requests")

    def __init__(self, user_id, society_id, session: Session, **kwargs):
        super().__init__(**kwargs)
        self.user_id = user_id
        self.society_id = society_id
        user = session.query(User).filter_by(id=user_id).first()
        if user:
            self.user_email = user.email
            self.user_designation = user.designation
            self.user_department = user.department
