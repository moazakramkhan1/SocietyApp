from fastapi import APIRouter,Depends,status
from .. import database,schemas
from ..workers import user
from sqlalchemy.orm import Session




router = APIRouter(
    tags=["user"]
)

@router.post('/signup',status_code=status.HTTP_201_CREATED)
def CreateUser(request:schemas.User,db:Session=Depends(database.get_db)):
   return user.create(request,db)
    
