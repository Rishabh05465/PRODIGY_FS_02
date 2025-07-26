from sqlalchemy import Column, Integer, String
from database.db_conn import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String,index=True, nullable=False)
    designation = Column(String, nullable=False)
    fullName = Column(String, nullable=False)
