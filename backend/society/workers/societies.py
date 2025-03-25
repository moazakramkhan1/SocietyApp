from .. import models,schemas
from sqlalchemy.orm import Session




# def getAll():
#     return null


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


