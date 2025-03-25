from .. import models,schemas
from sqlalchemy.orm import Session



def get_all_societies(db: Session):
    societies = db.query(models.Societies).all()
    return societies


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


