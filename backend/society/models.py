from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey
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
    memberships = relationship("Membership", back_populates="user")
    administered_societies = relationship("Societies", back_populates="admin_user")

class Societies(Base):
    __tablename__ = "Societies"
    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    description = Column(String)
    members = Column(Integer, default=0)
    image = Column(String, nullable=True)
    admin_user = relationship("User", back_populates="administered_societies")
    memberships = relationship("Membership", back_populates="society")

class Membership(Base):
    __tablename__ = "memberships"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    society_id = Column(Integer, ForeignKey("Societies.id"))
    user = relationship("User", back_populates="memberships")
    society = relationship("Societies", back_populates="memberships")
