from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from database import Base

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(Text)
    video_url = Column(String(255))
    github_link = Column(String(255))
    live_url = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
