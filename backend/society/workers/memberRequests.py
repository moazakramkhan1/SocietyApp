from fastapi import HTTPException,status
from .. import schemas,models
from sqlalchemy.orm import Session


def JoinNow(request:schemas.Request,db:Session):
    newRequest = models.Request(
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

def getuserR(user_id:int,db:Session):
    requests = db.query(models.Request).filter(models.Request.user_id==user_id).all()
    if not requests:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"no requests found for this user {user_id}")
    return requests

def getsocietyR(admin_id: int, db: Session):
    society = db.query(models.Society).filter(models.Society.admin_id == admin_id).first()
    if not society:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No society found for this admin {admin_id}")
    
    society_id = society.id
    requests = db.query(models.Request).filter(models.Request.society_id == society_id).all()
    return requests or []

def acceptR(request_id:int,db:Session):
    request = db.query(models.Request).filter(models.Request.id==request_id).first()
    if not request:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"request with id {request_id} not found")
    membership = models.Membership(
        user_id = request.user_id,
        society_id = request.society_id,
        role = "member"
    )
    db.add(membership)
    db.query(models.Request).filter(models.Request.id==request_id).delete()
    db.commit()
    db.refresh(membership)
    return request

# def rejectR(request_id:int,db:Session):
#     request = db.query(models.Request).filter(models.Request.id==request_id).first()
#     if not request:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"request with id {request_id} not found")
#     db.query(models.Request).filter(models.Request.id==request_id).delete()
#     db.commit()
#     return {"message":f"Unfortunately your request was rejected"}