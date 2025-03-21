
from .. import models,schemas
from ..hashing import Hash
from sqlalchemy.orm import Session
def create(request:schemas.User,db:Session):
    newUser = models.User(username=request.username,
                          email=request.email,
                          password=Hash.hashPwd(request.password),
                          confirmpassword=Hash.hashPwd(request.confirmpassword)
                          ,role=request.role)
    db.add(newUser)
    db.commit()
    db.refresh(newUser)
    return newUser