from pydantic import BaseModel


class User(BaseModel):
    username:str
    email:str
    phonenumber:str
    password:str
    confirmpassword:str
    role:str
    image:str

class Society(BaseModel):
    admin_id:int
    name:str
    description:str
    members:int
    image:str



class ShowUser(BaseModel):
    username:str
    email:str
    role:str
    class Config():
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None