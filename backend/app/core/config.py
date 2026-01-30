import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Participa DF API"
    API_V1_STR: str = "/api"
    
    # Database (SQLite for Hackathon simplicity)
    # DB_USER: str = os.getenv("DB_USER", "root")
    # DB_PASSWORD: str = os.getenv("DB_PASSWORD", "password")
    # DB_HOST: str = os.getenv("DB_HOST", "localhost")
    # DB_PORT: str = os.getenv("DB_PORT", "3306")
    # DB_NAME: str = os.getenv("DB_NAME", "participa_df")
    
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///./participa_df.db"

    # File Uploads
    UPLOAD_DIR: str = "uploads"

    class Config:
        case_sensitive = True

settings = Settings()
