from fastapi import APIRouter,Depends,status
from .. import database,schemas
from ..workers import user
from sqlalchemy.orm import Session




router = APIRouter(
    tags=["user"]
)

@router.post('/signUp',status_code=status.HTTP_201_CREATED)
def CreateUser(request:schemas.User,db:Session=Depends(database.get_db)):
   return user.create(request,db)
    
@router.get('/admin/{id}',status_code=status.HTTP_200_OK)
def getAdminDetails(id:int,db:Session=Depends(database.get_db)):
   return user.getadmin(id,db)