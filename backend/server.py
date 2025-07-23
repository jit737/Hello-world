from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from models import *
from database import DatabaseManager
from typing import List, Optional

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Jitmohan Raj Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Original hello world endpoint
@api_router.get("/")
async def root():
    return {"message": "Hello World from Jitmohan Raj's Portfolio API"}

# Personal Info endpoints
@api_router.get("/personal-info", response_model=PersonalInfo)
async def get_personal_info():
    """Get personal information"""
    info = await DatabaseManager.get_personal_info()
    if not info:
        raise HTTPException(status_code=404, detail="Personal information not found")
    return info

@api_router.put("/personal-info", response_model=PersonalInfo)
async def update_personal_info(info_update: PersonalInfoUpdate):
    """Update personal information"""
    updated_info = await DatabaseManager.update_personal_info(info_update)
    if not updated_info:
        raise HTTPException(status_code=500, detail="Failed to update personal information")
    return updated_info

# Projects endpoints
@api_router.get("/projects", response_model=List[Project])
async def get_projects(featured_only: bool = False):
    """Get all projects or only featured ones"""
    projects = await DatabaseManager.get_projects(featured_only=featured_only)
    return projects

@api_router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """Get a specific project by ID"""
    project = await DatabaseManager.get_project_by_id(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@api_router.post("/projects", response_model=Project)
async def create_project(project: ProjectCreate):
    """Create a new project"""
    return await DatabaseManager.create_project(project)

@api_router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project_update: ProjectUpdate):
    """Update a project"""
    updated_project = await DatabaseManager.update_project(project_id, project_update)
    if not updated_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project

@api_router.delete("/projects/{project_id}", response_model=MessageResponse)
async def delete_project(project_id: str):
    """Delete a project"""
    success = await DatabaseManager.delete_project(project_id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found")
    return MessageResponse(message="Project deleted successfully")

# Experience endpoints
@api_router.get("/experience", response_model=List[Experience])
async def get_experience():
    """Get all work experience"""
    return await DatabaseManager.get_experiences()

@api_router.get("/experience/{experience_id}", response_model=Experience)
async def get_experience_item(experience_id: str):
    """Get a specific experience by ID"""
    experience = await DatabaseManager.get_experience_by_id(experience_id)
    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    return experience

@api_router.post("/experience", response_model=Experience)
async def create_experience(experience: ExperienceCreate):
    """Create a new experience entry"""
    return await DatabaseManager.create_experience(experience)

# Skills endpoints
@api_router.get("/skills", response_model=List[Skill])
async def get_skills(category: Optional[str] = None):
    """Get all skills or filter by category"""
    return await DatabaseManager.get_skills(category=category)

@api_router.post("/skills", response_model=Skill)
async def create_skill(skill: SkillCreate):
    """Create a new skill"""
    return await DatabaseManager.create_skill(skill)

# Contact endpoints
@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact_form(contact: ContactMessageCreate):
    """Submit a contact form message"""
    return await DatabaseManager.create_contact_message(contact)

@api_router.get("/contact-messages", response_model=List[ContactMessage])
async def get_contact_messages(unread_only: bool = False):
    """Get contact messages (admin endpoint)"""
    return await DatabaseManager.get_contact_messages(unread_only=unread_only)

@api_router.put("/contact-messages/{message_id}/read", response_model=MessageResponse)
async def mark_message_as_read(message_id: str):
    """Mark a contact message as read"""
    success = await DatabaseManager.mark_message_as_read(message_id)
    if not success:
        raise HTTPException(status_code=404, detail="Message not found")
    return MessageResponse(message="Message marked as read")

# Statistics endpoint
@api_router.get("/stats")
async def get_portfolio_stats():
    """Get portfolio statistics"""
    projects = await DatabaseManager.get_projects()
    experience = await DatabaseManager.get_experiences()
    skills = await DatabaseManager.get_skills()
    messages = await DatabaseManager.get_contact_messages()
    
    return {
        "total_projects": len(projects),
        "featured_projects": len([p for p in projects if p.is_featured]),
        "years_experience": 4,
        "total_skills": len(skills),
        "total_messages": len(messages),
        "unread_messages": len([m for m in messages if not m.is_read])
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    """Initialize default data on startup"""
    logger.info("Initializing default portfolio data...")
    await DatabaseManager.initialize_default_data()
    logger.info("Portfolio API started successfully!")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
