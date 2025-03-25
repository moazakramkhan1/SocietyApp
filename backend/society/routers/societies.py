from fastapi import APIRouter,Depends,status
from .. import database,schemas
from ..workers import user
from sqlalchemy.orm import Session
from ..workers import societies
from ..models import Societies

router = APIRouter()

@router.get('/societies',status_code=status.HTTP_200_OK)
def getAllSocieties(db:Session=Depends(database.get_db)):
 societies = db.query(Societies).all()
 return societies
 
@router.post('/createSociety',status_code=status.HTTP_201_CREATED)
def createSociety(request:schemas.Society,db:Session=Depends(database.get_db)):
 return societies.create_society(request,db)