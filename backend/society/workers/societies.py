from fastapi import HTTPException,status
from .. import models,schemas
from sqlalchemy.orm import Session



def all(db: Session):
    societies = db.query(models.Societies).all()
    return societies

def particular(id:int,db:Session):
    society = db.query(models.Societies).filter(models.Societies.id==id).first()
    if not society:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"user with this {id} not found")
    return society


def create_society(request:schemas.Society,db:Session):
    newSociety = models.Societies(
        admin_id = request.admin_id,
        name = request.name,
        description = request.description,
        members = request.members,
        image = request.image
    )
    db.add(newSociety)
    db.commit()
    db.refresh(newSociety)
    return newSociety


