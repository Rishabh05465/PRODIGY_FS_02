from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base

DATABASE_URL = "postgresql+asyncpg://postgres:root@localhost:5432/prodigy_fs_02"

# Create async engine
engine = create_async_engine(DATABASE_URL, echo=True)

Base = declarative_base()

# Create async session
async_session = sessionmaker(
    engine, expire_on_commit=False, class_=AsyncSession
)

# Dependency for FastAPI routes
async def get_db():
    async with async_session() as session:
        yield session
