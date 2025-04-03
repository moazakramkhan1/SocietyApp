from fastapi import APIRouter, Depends,status
from sqlalchemy.orm import Session
from .. import schemas,database
from ..workers import memberRequests


router = APIRouter(
    tags=["memberRequests"]
)

@router.post("/memberRequest",status_code=status.HTTP_201_CREATED)
def joinNow(request: schemas.Request, db: Session = Depends(database.get_db)):
    return memberRequests.JoinNow(request, db)


@router.get("/getUserRequests/{user_id}", status_code=status.HTTP_200_OK)
def getUserRequests(user_id: int, db: Session = Depends(database.get_db)):
    return memberRequests.getuserR(user_id, db)

@router.get("/getSocietyRequests/{admin_id}", status_code=status.HTTP_200_OK)
def getSocietyRequests(admin_id: int, db: Session = Depends(database.get_db)):
    return memberRequests.getsocietyR(admin_id, db)

@router.put("/acceptRequest/{request_id}", status_code=status.HTTP_200_OK)
def acceptRequest(request_id: int, db: Session = Depends(database.get_db)):
    return memberRequests.acceptR(request_id, db)

@router.delete("/rejectRequest/{request_id}", status_code=status.HTTP_200_OK)
def rejectRequest(request_id: int, db: Session = Depends(database.get_db)):
    return memberRequests.rejectR(request_id, db)

@router.get("/isMember/{user_id}/{society_id}", status_code=status.HTTP_200_OK)
def isMember(user_id: int, society_id: int, db: Session = Depends(database.get_db)):
    return memberRequests.isMember(user_id, society_id, db)