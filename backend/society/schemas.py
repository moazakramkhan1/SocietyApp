from __future__ import annotations
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
class UserCreate(BaseModel):
    username: str
    email: str
    phonenumber: str
    designation: str
    department: str
    password: str
    role: str
    image: Optional[str] = None
    societies: List["Society"] = []
    executive_societies: List["Society"] = []
    requests: List["Request"] = []

    class Config:
        from_attributes = True
        exclude = {"societies", "executive_societies", "requests"}

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    phonenumber: Optional[str]
    designation: Optional[str]
    department: Optional[str]
    role: str
    image: Optional[str] = None

    class Config:
        from_attributes = True

class Society(BaseModel):
    admin_id: int
    name: str
    description: str
    num_members: int
    image: Optional[str] = None
    members: List[UserCreate] = []
    executives: List[UserCreate] = []
    events: List["EventBase"] = []
    requests: List["Request"] = []

    class Config:
        from_attributes = True
        exclude = {"members", "executives", "events", "requests"}

class UpdateSociety(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None

    class Config:
        from_attributes = True

class Membership(BaseModel):
    user_id: int
    society_id: int
    role: str

    class Config:
        from_attributes = True

class ExecutiveMembership(BaseModel):
    user_id: int
    society_id: int
    designation: str

    class Config:
        from_attributes = True

class Request(BaseModel):
    user_id: int
    society_id: int
    status: str
    image: Optional[str] = None
    user_email: Optional[str] = None
    user_designation: Optional[str] = None
    user_department: Optional[str] = None
    society_name: Optional[str] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

    class Config:
        from_attributes = True

class TokenData(BaseModel):
    email: Optional[str] = None

    class Config:
        from_attributes = True

class AnnouncementBase(BaseModel):
    subject: str
    body: str
    society_id: int

class AnnouncementCreate(AnnouncementBase):
    pass

class AnnouncementResponse(AnnouncementBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class EventBase(BaseModel):
    name: str
    description: str
    logo: str
    date: datetime
    society_id: int

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: int

    class Config:
        from_attributes = True
