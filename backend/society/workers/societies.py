from fastapi import HTTPException,status
from .. import models,schemas
from sqlalchemy.orm import Session



def all(db: Session):
    societies = db.query(models.Society).all()
    return societies

def particular(id:int,db:Session):
    society = db.query(models.Society).filter(models.Society.id==id).first()
    if not society:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"user with this {id} not found")
    return society


def create_society(request:schemas.Society,db:Session):
    newSociety = models.Society(
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

def update_society(id: int, request: schemas.UpdateSociety, db: Session):
    society = db.query(models.Society).filter(models.Society.id == id).first()
    
    if not society:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Society with ID {id} not found")

    if request.name is not None:
        society.name = request.name
    if request.description is not None:
        society.description = request.description
    if request.image is not None:
        society.image = request.image

    db.commit()
    db.refresh(society)
    return society

def allMembers(id: int, db: Session):
    society = db.query(models.Society).filter(models.Society.admin_id == id).first()
    if not society:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No society found for admin with ID {id}"
        )
    return (
        db.query(models.User)
        .join(models.Membership)
        .filter(models.Membership.society_id == society.id)
        .all()
    )


def delete_society(id: int, db: Session):
    society = db.query(models.Society).filter(models.Society.id == id).first()
    if not society:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Society with ID {id} not found"
        )
    db.delete(society)
    db.commit()
    return {"message": "Society deleted successfully"}

