from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from utils.helpers import create_jwt_token
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database.db_conn import get_db
from database.login_model import User

router = APIRouter(
    prefix="/register",
    tags=["Register"]
)

class IRegister(BaseModel):
    fullName:str
    password:str
    email:str

@router.post("/")
async def create_emp(data:IRegister, db: AsyncSession = Depends(get_db)):
    # Create new user
    new_user = User(email=data.email, password=data.password, fullName=data.fullName)
    db.add(new_user)
    await db.commit()         
    await db.refresh(new_user) 
    return {"message":"Register successfully"}