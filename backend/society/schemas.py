from pydantic import BaseModel
from typing import List, Optional
from datetime import date,time

class User(BaseModel):
    username: str
    email: str
    phonenumber: str
    designation: str
    department:str
    password: str
    confirmpassword: str
    role: str
    image: Optional[str] = None
    societies: List["Society"] = []
    executive_societies: List["Society"] = []
    requests: List["Request"] = []

    class Config:
        from_attributes = True
class Events(BaseModel):
    title:str
    date:date
    time:time
class Society(BaseModel):
    admin_id: int
    name: str
    description: str
    num_members: int
    image: Optional[str] = None
    members: List[User] = []
    executives: List[User] = []
    events:List[Events] = []
    requests: List["Request"] = []

    class Config:
        from_attributes = True

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
