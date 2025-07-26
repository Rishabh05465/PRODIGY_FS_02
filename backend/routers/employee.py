from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from utils.helpers import verify_jwt_token
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database.db_conn import get_db
from database.emp_model import Employee
from sqlalchemy import and_, delete
from fastapi.security import OAuth2PasswordBearer

router = APIRouter(
    prefix='/employee',
    tags=["Employee"],
    dependencies=[Depends(verify_jwt_token)]
)

class IEmployee(BaseModel):    
    fullName:str
    designation:str
    email:str

class IDelEmp(BaseModel):
    id:int

@router.get('/')
async def getEmp( db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Employee))
    emp=result.scalars().all()

    #if not emp:
    #    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="employee not found")
    return{"data":emp}

@router.post('/')
async def createEmp(data:IEmployee, db:AsyncSession = Depends(get_db)):
    result = await db.execute(select(Employee).where((Employee.email==data.email)))
    emp= result.scalars().first()
    if not emp:
        new_emp = Employee(email=data.email, designation=data.designation, fullName=data.fullName)
        db.add(new_emp)
        await db.commit()
        await db.refresh(new_emp)
        
        return {"message":"Employee registration successful","data":new_emp}
        
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="email already exists")
    
@router.delete('/')
async def del_emp(data:IDelEmp, db:AsyncSession = Depends(get_db)):
    result = await db.execute(select(Employee).where((Employee.id==data.id)))
    employee = result.scalar_one_or_none()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    await db.delete(employee)
    await db.commit()
    return{"message":"employee record deleted successfully","data":employee}

@router.put('/')
async def updateEmp(data:IEmployee, db:AsyncSession = Depends(get_db)):
    result= await db.execute(select (Employee).where((Employee.email==data.email)))
    employee = result.scalar_one_or_none()

    
    employee.fullName=data.fullName
    employee.designation=data.designation
    
    await db.commit()
    await db.refresh(employee)

    return{"message":"employee record updated successfully","data":employee}