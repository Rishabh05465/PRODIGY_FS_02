import asyncio
from fastapi import FastAPI
from database.db_conn import engine
from database.login_model import Base
from fastapi.middleware.cors import CORSMiddleware
from routers import login
from routers import register
from routers import employee

app = FastAPI()

origin=["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,  # Allow cookies, authorization headers, etc.
    allow_methods=["*"],     # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],     # Allow all headers in the request
)

@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(login.router)
app.include_router(register.router)
app.include_router(employee.router)