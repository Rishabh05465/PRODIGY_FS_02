from fastapi import HTTPException, Depends, status
import datetime
import jwt
from fastapi.security import OAuth2PasswordBearer
#from passlib.context import CryptContext

SECRET_KEY = "6e994ac6febc7c29691d897aaec910e9e7f87064ed6322fac04f33e71b369ba4"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def create_jwt_token(data: dict):
    """Generate JWT token"""
    payload = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload.update({"exp": expire, "iat": datetime.datetime.utcnow()})
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

# Function to verify token
def verify_jwt_token(token: str = Depends(oauth2_scheme)):
    try:
        # Decode the token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  # payload contains user data (e.g., sub, exp)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Invalid token")
    

"""pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)
    
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)"""