from fastapi import HTTPException,status
from .. import models,schemas
from ..hashing import Hash
from sqlalchemy.orm import Session
def create(request:schemas.UserCreate,db:Session):
    newUser = models.User(username=request.username,
                          email=request.email,
                          phonenumber=request.phonenumber,
                          designation=request.designation,
                          department=request.department,
                          password=Hash.hashPwd(request.password),
                          role=request.role,
                          image=request.image
                          )
    db.add(newUser)
    db.commit()
    db.refresh(newUser)
    return newUser

def getadmin(id:int,db:Session):
    admin = db.query(models.User).filter(models.User.id==id).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"user with this {id} not found")
    return admin