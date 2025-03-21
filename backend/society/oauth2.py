from fastapi import status,HTTPException,Depends
from .jwtToken import VerifyToken
from fastapi.security import OAuth2PasswordBearer
#here login is the url where it should point
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token:str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    VerifyToken(token,credentials_exception)