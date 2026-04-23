from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import projects, upload

# Create db tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio API")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router)
app.include_router(upload.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Portfolio API"}
