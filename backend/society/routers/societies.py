from fastapi import APIRouter,Depends,status
from .. import database,schemas
from ..workers import societies
from sqlalchemy.orm import Session
from ..workers import societies
from ..models import Societies


router = APIRouter()

@router.get('/societies',status_code=status.HTTP_200_OK)
def getAllSocieties(db:Session=Depends(database.get_db)):
 return societies.all(db)

@router.get('/society/{id}',status_code=status.HTTP_200_OK)
def getSociety(id:int,db:Session=Depends(database.get_db)):
  return societies.particular(id,db)

@router.put("/societyUpdate/{id}")
def update_society_endpoint(id: int, request: schemas.UpdateSociety, db: Session = Depends(database.get_db)):
    return societies.update_society(id, request, db)
 
 
@router.post('/createSociety',status_code=status.HTTP_201_CREATED)
def createSociety(request:schemas.Society,db:Session=Depends(database.get_db)):
 return societies.create_society(request,db)
