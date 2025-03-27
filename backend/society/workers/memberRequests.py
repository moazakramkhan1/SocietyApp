from .. import schemas,models
from sqlalchemy.orm import Session


def JoinNow(request:schemas.Request,db:Session):
    newRequest = models.Requests(
        user_id = request.user_id,
        society_id = request.society_id,
        status = request.status,
        image = request.image,
        session = db 
    )
    db.add(newRequest)
    db.commit()
    db.refresh(newRequest)
    return newRequest

def getAll(db:Session):
    allRequests = db.query(models.Requests).all()
    return allRequests