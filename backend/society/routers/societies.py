from fastapi import APIRouter,Depends,status,HTTPException
from .. import database,schemas,models
from ..workers import societies
from sqlalchemy.orm import Session
from ..workers import societies
from typing import List


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

@router.get('/allMembers/{id}',status_code=status.HTTP_200_OK,response_model=List[schemas.UserOut])
def getAllMembers(id:int,db:Session=Depends(database.get_db)):
 return societies.allMembers(id, db)

@router.delete('/societyDelete/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_society(id: int, db: Session = Depends(database.get_db)):
    return societies.delete_society(id, db)

@router.get("/societyByAdmin/{admin_id}", status_code=status.HTTP_200_OK)
def get_society_by_admin(admin_id: int, db: Session = Depends(database.get_db)):
    society = db.query(models.Society).filter(models.Society.admin_id == admin_id).first()
    if not society:
        raise HTTPException(status_code=404, detail="Society not found for this admin")
    return society