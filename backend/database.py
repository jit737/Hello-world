from motor.motor_asyncio import AsyncIOMotorClient
from models import *
from typing import List, Optional
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
projects_collection = db.projects
experience_collection = db.experience
skills_collection = db.skills
contact_collection = db.contact_messages
personal_info_collection = db.personal_info

class DatabaseManager:
    
    # Project CRUD operations
    @staticmethod
    async def create_project(project: ProjectCreate) -> Project:
        project_dict = project.dict()
        project_obj = Project(**project_dict)
        await projects_collection.insert_one(project_obj.dict())
        return project_obj
    
    @staticmethod
    async def get_projects(featured_only: bool = False) -> List[Project]:
        query = {"is_featured": True} if featured_only else {}
        projects = await projects_collection.find(query).sort("created_at", -1).to_list(100)
        return [Project(**project) for project in projects]
    
    @staticmethod
    async def get_project_by_id(project_id: str) -> Optional[Project]:
        project = await projects_collection.find_one({"id": project_id})
        return Project(**project) if project else None
    
    @staticmethod
    async def update_project(project_id: str, project_update: ProjectUpdate) -> Optional[Project]:
        update_data = {k: v for k, v in project_update.dict().items() if v is not None}
        if update_data:
            update_data["updated_at"] = datetime.utcnow()
            await projects_collection.update_one({"id": project_id}, {"$set": update_data})
        return await DatabaseManager.get_project_by_id(project_id)
    
    @staticmethod
    async def delete_project(project_id: str) -> bool:
        result = await projects_collection.delete_one({"id": project_id})
        return result.deleted_count > 0
    
    # Experience CRUD operations
    @staticmethod
    async def create_experience(experience: ExperienceCreate) -> Experience:
        experience_dict = experience.dict()
        experience_obj = Experience(**experience_dict)
        await experience_collection.insert_one(experience_obj.dict())
        return experience_obj
    
    @staticmethod
    async def get_experiences() -> List[Experience]:
        experiences = await experience_collection.find().sort("order_index", 1).to_list(100)
        return [Experience(**exp) for exp in experiences]
    
    @staticmethod
    async def get_experience_by_id(experience_id: str) -> Optional[Experience]:
        experience = await experience_collection.find_one({"id": experience_id})
        return Experience(**experience) if experience else None
    
    # Skills CRUD operations
    @staticmethod
    async def create_skill(skill: SkillCreate) -> Skill:
        skill_dict = skill.dict()
        skill_obj = Skill(**skill_dict)
        await skills_collection.insert_one(skill_obj.dict())
        return skill_obj
    
    @staticmethod
    async def get_skills(category: Optional[str] = None) -> List[Skill]:
        query = {"category": category} if category else {}
        skills = await skills_collection.find(query).sort("name", 1).to_list(100)
        return [Skill(**skill) for skill in skills]
    
    # Contact CRUD operations
    @staticmethod
    async def create_contact_message(contact: ContactMessageCreate) -> ContactMessage:
        contact_dict = contact.dict()
        contact_obj = ContactMessage(**contact_dict)
        await contact_collection.insert_one(contact_obj.dict())
        return contact_obj
    
    @staticmethod
    async def get_contact_messages(unread_only: bool = False) -> List[ContactMessage]:
        query = {"is_read": False} if unread_only else {}
        messages = await contact_collection.find(query).sort("created_at", -1).to_list(100)
        return [ContactMessage(**message) for message in messages]
    
    @staticmethod
    async def mark_message_as_read(message_id: str) -> bool:
        result = await contact_collection.update_one(
            {"id": message_id}, 
            {"$set": {"is_read": True}}
        )
        return result.modified_count > 0
    
    # Personal Info CRUD operations
    @staticmethod
    async def get_personal_info() -> Optional[PersonalInfo]:
        info = await personal_info_collection.find_one()
        return PersonalInfo(**info) if info else None
    
    @staticmethod
    async def update_personal_info(info_update: PersonalInfoUpdate) -> Optional[PersonalInfo]:
        existing_info = await DatabaseManager.get_personal_info()
        
        if existing_info:
            update_data = {k: v for k, v in info_update.dict().items() if v is not None}
            update_data["updated_at"] = datetime.utcnow()
            await personal_info_collection.update_one(
                {"id": existing_info.id}, 
                {"$set": update_data}
            )
            return await DatabaseManager.get_personal_info()
        else:
            # Create new personal info if doesn't exist
            info_dict = info_update.dict()
            info_obj = PersonalInfo(**{k: v for k, v in info_dict.items() if v is not None})
            await personal_info_collection.insert_one(info_obj.dict())
            return info_obj
    
    @staticmethod
    async def initialize_default_data():
        """Initialize default data if collections are empty"""
        
        # Check if personal info exists
        existing_info = await DatabaseManager.get_personal_info()
        if not existing_info:
            default_info = PersonalInfoUpdate(
                name="Jitmohan Raj",
                title="Software Engineer",
                tagline="Building scalable backend systems with modern technologies",
                bio="Passionate backend developer with 4+ years of experience in designing and developing robust, scalable server-side applications. Specialized in Node.js ecosystem with expertise in microservices architecture, API development, and cloud technologies.",
                email="mohanjeet737@gmail.com",
                phone="+91 7992244318",
                location="Bangalore, India",
                github_url="https://github.com/jit737",
                linkedin_url="https://www.linkedin.com/in/jitmohan-raj-65ba898b/",
                twitter_url="https://twitter.com/jitmohan_dev"
            )
            await DatabaseManager.update_personal_info(default_info)
        
        # Check if projects exist
        existing_projects = await DatabaseManager.get_projects()
        if not existing_projects:
            default_projects = [
                ProjectCreate(
                    title="V-Sync (Vendor Portal)",
                    description="A comprehensive vendor onboarding platform enabling vendors to register, verify, and offer services/products. Features role-based access control, dynamic workflows, and real-time notifications.",
                    technologies=["React.js", "Node.js", "Express.js", "Knex.js", "PostgreSQL"],
                    github_url="https://github.com/jit737/v-sync-vendor-portal",
                    live_url="https://v-sync.jitmohan.dev",
                    image_url="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
                    is_featured=True
                ),
                ProjectCreate(
                    title="Sales and Marketing CRM",
                    description="CRM-based platform enabling product sales through social media and user campaigns with seamless server-client communication through RESTful APIs.",
                    technologies=["React.js", "Node.js", "Express.js", "Knex.js", "PostgreSQL"],
                    github_url="https://github.com/jit737/sales-marketing-crm",
                    live_url="https://crm.jitmohan.dev",
                    image_url="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=300&fit=crop",
                    is_featured=True
                ),
                ProjectCreate(
                    title="Middleware Integration (Toyota-Boshoku)",
                    description="Designed middleware for seamless data integration between SAP and ERP systems with automated connection recovery and optimized server performance.",
                    technologies=["Node.js", "Express.js", "PostgreSQL", "SAP Integration"],
                    github_url="https://github.com/jit737/toyota-middleware",
                    live_url="https://middleware.jitmohan.dev",
                    image_url="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
                    is_featured=False
                ),
                ProjectCreate(
                    title="Mobile App Backend (Acsen Agriscience)",
                    description="Centralized Node.js backend supporting 9 Android applications with real-time SAP integration, QR code scanning, and offline sync capabilities.",
                    technologies=["Node.js", "Express.js", "PostgreSQL", "SAP Integration", "Android"],
                    github_url="https://github.com/jit737/acsen-mobile-backend",
                    live_url="https://acsen-api.jitmohan.dev",
                    image_url="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=500&h=300&fit=crop",
                    is_featured=True
                ),
                ProjectCreate(
                    title="Admin Web Portal",
                    description="Secure admin portal for managing user authentication, roles, permissions, and centralized control over mobile applications with enterprise-grade security.",
                    technologies=["React.js", "Node.js", "Express.js", "PostgreSQL", "RBAC"],
                    github_url="https://github.com/jit737/admin-web-portal",
                    live_url="https://admin.jitmohan.dev",
                    image_url="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
                    is_featured=False
                )
            ]
            for project in default_projects:
                await DatabaseManager.create_project(project)
        
        # Check if skills exist
        existing_skills = await DatabaseManager.get_skills()
        if not existing_skills:
            default_skills = [
                SkillCreate(name="Node.js", level=95, icon="🟢", category="backend"),
                SkillCreate(name="Express.js", level=90, icon="⚡", category="backend"),
                SkillCreate(name="Nest.js", level=85, icon="🐱", category="backend"),
                SkillCreate(name="REST APIs", level=95, icon="🔗", category="backend"),
                SkillCreate(name="Microservices", level=85, icon="🔧", category="architecture"),
                SkillCreate(name="PostgreSQL", level=88, icon="🐘", category="database"),
                SkillCreate(name="MySQL", level=85, icon="🗄️", category="database"),
                SkillCreate(name="MongoDB", level=82, icon="🍃", category="database"),
                SkillCreate(name="Docker", level=80, icon="🐳", category="devops"),
                SkillCreate(name="Jenkins", level=75, icon="🔨", category="devops"),
                SkillCreate(name="Git", level=92, icon="📝", category="tools"),
                SkillCreate(name="AWS", level=78, icon="☁️", category="cloud"),
                SkillCreate(name="Postman", level=85, icon="📮", category="tools")
            ]
            for skill in default_skills:
                await DatabaseManager.create_skill(skill)
        
        # Check if experience exists
        existing_experience = await DatabaseManager.get_experiences()
        if not existing_experience:
            default_experiences = [
                ExperienceCreate(
                    title="Software Engineer",
                    company="Current Company",
                    duration="2022 - Present",
                    location="Bangalore, India",
                    description="Leading backend development for enterprise-level applications and client projects. Specialized in Node.js ecosystem with expertise in microservices architecture and system integrations.",
                    achievements=[
                        "Developed V-Sync vendor portal serving 12-member cross-functional team",
                        "Built CRM platform handling social media sales campaigns for 10-member team",
                        "Architected middleware solutions for Toyota-Boshoku SAP-ERP integration"
                    ],
                    order_index=1
                ),
                ExperienceCreate(
                    title="Backend Developer - Client Projects",
                    company="Acsen Agriscience",
                    duration="Aug 2023 - July 2024",
                    location="Remote",
                    description="Led development of 9 Java-based Android applications with centralized Node.js backend. Implemented real-time SAP integration and offline sync capabilities.",
                    achievements=[
                        "Deployed 9 Android apps supporting core business operations",
                        "Built secure Admin Web Portal with RBAC and centralized control",
                        "Engineered QR code scanning modules with high accuracy",
                        "Enabled offline data capture for field operatives"
                    ],
                    order_index=2
                ),
                ExperienceCreate(
                    title="Full Stack Developer",
                    company="Previous Projects",
                    duration="Jun 2022 - Mar 2023",
                    location="Bangalore, India",
                    description="Developed CRM-based platform and middleware solutions. Focused on RESTful API development and system integrations.",
                    achievements=[
                        "Created RESTful APIs for seamless client-server communication",
                        "Enhanced user experience with React.js front-end development",
                        "Optimized server performance through efficient API handling"
                    ],
                    order_index=3
                )
            ]
            for experience in default_experiences:
                await DatabaseManager.create_experience(experience)