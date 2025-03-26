from sqlalchemy import Column, Integer, String, ForeignKey,Date,Time
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String)
    phonenumber = Column(String, nullable=True)
    password = Column(String)
    confirmpassword = Column(String)
    role = Column(String)
    image = Column(String, nullable=True)
    
    memberships = relationship("Membership", back_populates="user", overlaps="societies")
    administered_societies = relationship("Societies", back_populates="admin_user")
    
    societies = relationship("Societies", secondary="memberships", back_populates="members", overlaps="memberships")
    executive_memberships = relationship("ExecutiveMembership", back_populates="user")

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
