from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
from app.core.config import settings
from app.core.database import Base, engine
from app.api.endpoints import manifestacao

# Create Database Tables (In production, use Alembic)
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

# CORS Configuration
origins = [
    "http://localhost:3000", # React
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Static directory for uploaded files
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include Routers
app.include_router(manifestacao.router, prefix=settings.API_V1_STR, tags=["manifestacao"])

if __name__ == "__main__":
    import uvicorn
    import os
    uvicorn.run(app, host="0.0.0.0", port=8000)
