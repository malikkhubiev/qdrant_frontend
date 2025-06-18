import sqlalchemy
from sqlalchemy import Table, Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from db import metadata

users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("phone", String, unique=True, index=True),
    Column("password", String),
    Column("is_active", Boolean, default=True),
    Column("created_at", DateTime, server_default=func.now()),
)

phone_verifications = Table(
    "phone_verifications",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("phone", String, index=True),
    Column("code", String),
    Column("created_at", DateTime, server_default=func.now()),
) 