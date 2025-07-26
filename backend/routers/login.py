from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from utils.helpers import create_jwt_token
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database.db_conn import get_db
from database.login_model import User
from sqlalchemy import and_
from fastapi.security import OAuth2PasswordBearer

router = APIRouter(
    prefix="/login",
    tags=["Login"]
)

class ILogin(BaseModel):
    email:str
    password:str

@router.post('/')
async def login(info:ILogin, db: AsyncSession = Depends(get_db)):
# Find user by email
    result = await db.execute(select(User).where(
            and_(User.email == info.email, User.password == info.password)
        ))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    else: 
        token = create_jwt_token({"id":user.id})
        return {"message": "Login successful","token":token,"name":user.fullName}

    # Verify password
    #if not verify_password(info.password, user.password):
    #    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    