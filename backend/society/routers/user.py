from fastapi import APIRouter,Depends,status
from .. import database,schemas
from ..workers import user
from .. import models
from sqlalchemy.orm import Session




router = APIRouter(
    tags=["user"]
)

@router.post('/signUp', status_code=status.HTTP_201_CREATED)
def CreateUser(request: schemas.UserCreate, db: Session = Depends(database.get_db)):
   return user.create(request,db)
    
@router.get('/admin/{id}',status_code=status.HTTP_200_OK)
def getAdminDetails(id:int,db:Session=Depends(database.get_db)):
   return user.getadmin(id,db)

@router.get('/notifications/{user_id}', status_code=status.HTTP_200_OK)
def get_notifications(user_id: int, db: Session = Depends(database.get_db)):
    notifications = db.query(models.Notification).filter(models.Notification.user_id == user_id).all()
    return notifications

@router.get('/committeeMembers',status_code=status.HTTP_200_OK)
def getCommitteeMembers(db:Session = Depends(database.get_db)):
   return user.getCommitteeMembers(db)