import os
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import sqlalchemy
import httpx
import random
from models import users, phone_verifications
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from db import database, metadata
from fastapi.security import OAuth2PasswordRequestForm

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Можно ограничить до нужного домена
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SMSRU_API_ID = "BB8725B0-3255-D0EE-3679-9C53FDFC7179"  # <-- ВСТАВЬ СЮДА СВОЙ API ID

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class RequestCodeSchema(BaseModel):
    phone: str

class VerifyCodeSchema(BaseModel):
    phone: str
    code: str

class RegisterSchema(BaseModel):
    phone: str
    code: str
    password: str

class LoginSchema(BaseModel):
    phone: str
    password: str

@app.on_event("startup")
async def startup():
    await database.connect()
    engine = sqlalchemy.create_engine(
        "sqlite+pysqlite:///./test.db", connect_args={"check_same_thread": False}
    )
    metadata.create_all(engine)

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.post("/register/request_code")
async def request_code(data: RequestCodeSchema):
    code = str(random.randint(1000, 9999))
    # Удаляю старые коды для этого номера
    await database.execute(phone_verifications.delete().where(phone_verifications.c.phone == data.phone))
    # Сохраняю новый код в БД
    await database.execute(phone_verifications.insert().values(phone=data.phone, code=code))
    # Отправляю SMS
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://sms.ru/sms/send?api_id={SMSRU_API_ID}&to={data.phone}&msg=Ваш+код:+{code}&json=1"
        )
        result = response.json()
        if result.get("status") != "OK":
            raise HTTPException(status_code=400, detail="Ошибка отправки SMS")
    return {"ok": True}

@app.post("/register/verify_code")
async def verify_code(data: VerifyCodeSchema):
    query = phone_verifications.select().where(
        (phone_verifications.c.phone == data.phone) & (phone_verifications.c.code == data.code)
    )
    record = await database.fetch_one(query)
    if not record:
        raise HTTPException(status_code=400, detail="Неверный код")
    # Не создаём пользователя здесь!
    return {"ok": True}

@app.post("/register")
async def register(data: RegisterSchema):
    # Проверяем код подтверждения
    query = phone_verifications.select().where(
        (phone_verifications.c.phone == data.phone) & (phone_verifications.c.code == data.code)
    )
    record = await database.fetch_one(query)
    if not record:
        raise HTTPException(status_code=400, detail="Неверный код подтверждения")
    # Проверяем, есть ли уже пользователь
    user = await database.fetch_one(users.select().where(users.c.phone == data.phone))
    if user:
        raise HTTPException(status_code=400, detail="Пользователь уже существует")
    # Хэшируем пароль
    hashed_password = pwd_context.hash(data.password)
    # Добавляем пользователя
    user_id = await database.execute(users.insert().values(phone=data.phone, is_active=True, password=hashed_password))
    # Удаляем код подтверждения
    await database.execute(phone_verifications.delete().where(phone_verifications.c.phone == data.phone))
    return {"ok": True, "user_id": user_id}

@app.post("/login")
async def login(data: LoginSchema):
    user = await database.fetch_one(users.select().where(users.c.phone == data.phone))
    if not user or not user["password"]:
        raise HTTPException(status_code=400, detail="Неверный номер телефона или пароль")
    if not pwd_context.verify(data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Неверный номер телефона или пароль")
    # Можно добавить генерацию токена, сейчас просто возвращаем ok
    return {"ok": True, "user": {"id": user["id"], "phone": user["phone"]}} 