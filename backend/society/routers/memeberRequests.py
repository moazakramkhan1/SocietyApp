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

@router.get("/getallRequests",status_code=status.HTTP_200_OK)
def getAll(db: Session = Depends(database.get_db)):
    return memberRequests.getAll(db)