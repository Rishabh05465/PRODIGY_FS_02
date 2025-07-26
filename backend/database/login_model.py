from sqlalchemy import Column, Integer, String
from database.db_conn import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String,index=True, nullable=False)
    password = Column(String, nullable=False)
    fullName = Column(String, nullable=False)
