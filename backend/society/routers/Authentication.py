from fastapi import APIRouter,Depends,HTTPException,status
from .. import database,schemas,models
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta 
from sqlalchemy.orm import Session
from ..hashing import Hash
from ..jwtToken import create_access_token,ACCESS_TOKEN_EXPIRE_MINUTES
router = APIRouter(
    tags=['Authentication']
)

@router.post('/login',status_code=status.HTTP_200_OK)
def authenticate(request:OAuth2PasswordRequestForm = Depends(),db:Session=Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email==request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="invalid credentials")
    if not Hash.verify(request.password,user.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="invalid password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email,
              "role": user.role,
              'image':user.image,
              'id':user.id}
              , expires_delta=access_token_expires
    )
    return schemas.Token(access_token=access_token, token_type="bearer")