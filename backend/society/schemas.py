from pydantic import BaseModel
from typing import List, Optional

class User(BaseModel):
    username: str
    email: str
    phonenumber: str
    password: str
    confirmpassword: str
    role: str
    image: Optional[str] = None 

    class Config:
        orm_mode = True

class Society(BaseModel):
    admin_id: int
    name: str
    description: str
    num_members: int
    image: Optional[str] = None 
    members: List[User] = []  
    executives: List[User] = []  

    class Config:
        orm_mode = True

class Membership(BaseModel):
    user_id: int
    society_id: int
    role: str  

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

    class Config:
        orm_mode = True

class TokenData(BaseModel):
    email: Optional[str] = None

    class Config:
        orm_mode = True
