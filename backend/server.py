from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Auth
SECRET_KEY = os.environ.get('JWT_SECRET', 'carlos-portfolio-secret-key-2025')
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ─── Models ───

class ContactCreate(BaseModel):
    name: str
    email: str
    message: str

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    read: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ProjectCreate(BaseModel):
    title: str
    description: str
    image: str = ""
    category: str = "Full Stack"
    liveUrl: str = "#"
    githubUrl: str = "#"

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    category: Optional[str] = None
    liveUrl: Optional[str] = None
    githubUrl: Optional[str] = None

class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    image: str = ""
    category: str = "Full Stack"
    liveUrl: str = "#"
    githubUrl: str = "#"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class AdminLogin(BaseModel):
    username: str
    password: str

# ─── Helpers ───

def create_token(username: str) -> str:
    return jwt.encode({"sub": username}, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Token inválido")
        admin = await db.admin_users.find_one({"username": username})
        if not admin:
            raise HTTPException(status_code=401, detail="Admin no encontrado")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")

def send_email_notification(contact: ContactMessage):
    """Send email notification if SMTP is configured."""
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = os.environ.get('SMTP_PORT')
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')
    notify_email = os.environ.get('NOTIFY_EMAIL', 'carlosizaguirres705@gmail.com')

    if not all([smtp_host, smtp_port, smtp_user, smtp_pass]):
        logger.info("SMTP not configured — skipping email, message saved to DB")
        return

    try:
        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = notify_email
        msg['Subject'] = f"Nuevo mensaje de {contact.name} — Portafolio"
        body = f"Nombre: {contact.name}\nEmail: {contact.email}\n\nMensaje:\n{contact.message}"
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP(smtp_host, int(smtp_port)) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
        logger.info(f"Email notification sent for contact from {contact.email}")
    except Exception as e:
        logger.error(f"Failed to send email: {e}")

# ─── Seed Admin ───

async def seed_admin():
    existing = await db.admin_users.find_one({"username": "carlos"})
    if not existing:
        hashed = pwd_context.hash("CarlosAdmin2025!")
        await db.admin_users.insert_one({"username": "carlos", "password": hashed})
        logger.info("Admin user 'carlos' created")

async def seed_projects():
    count = await db.projects.count_documents({})
    if count == 0:
        initial_projects = [
            {
                "id": str(uuid.uuid4()),
                "title": "E-Commerce Platform",
                "description": "Una tienda online que armé de cero — carrito, pagos, inventario y un panel admin para que el cliente maneje todo sin depender de nadie.",
                "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
                "category": "Full Stack",
                "liveUrl": "#",
                "githubUrl": "#",
                "created_at": datetime.now(timezone.utc).isoformat(),
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Dashboard Analítico",
                "description": "Panel de métricas en tiempo real para un negocio que necesitaba ver sus números claros. Gráficas interactivas, reportes automáticos y filtros por fecha.",
                "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
                "category": "Backend",
                "liveUrl": "#",
                "githubUrl": "#",
                "created_at": datetime.now(timezone.utc).isoformat(),
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Sistema de Gestión",
                "description": "Sistema interno para una empresa: inventario, facturación, usuarios con roles. Lo hice pensando en que cualquier empleado pudiera usarlo sin capacitación larga.",
                "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
                "category": "Full Stack",
                "liveUrl": "#",
                "githubUrl": "#",
                "created_at": datetime.now(timezone.utc).isoformat(),
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Landing Page Corporativa",
                "description": "Página corporativa que convierte visitantes en clientes. Diseño responsive, animaciones suaves y formulario de contacto conectado directo al correo del dueño.",
                "image": "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
                "category": "Frontend",
                "liveUrl": "#",
                "githubUrl": "#",
                "created_at": datetime.now(timezone.utc).isoformat(),
            },
            {
                "id": str(uuid.uuid4()),
                "title": "API REST Microservicios",
                "description": "Arquitectura de microservicios con API bien documentada, auth con JWT y deploy automatizado. Hecha para escalar sin dolores de cabeza.",
                "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
                "category": "Backend",
                "liveUrl": "#",
                "githubUrl": "#",
                "created_at": datetime.now(timezone.utc).isoformat(),
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Portal Educativo",
                "description": "Plataforma de cursos online con seguimiento de progreso, evaluaciones y certificados. El cliente quería algo tipo Udemy pero a su medida.",
                "image": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop",
                "category": "Full Stack",
                "liveUrl": "#",
                "githubUrl": "#",
                "created_at": datetime.now(timezone.utc).isoformat(),
            },
        ]
        await db.projects.insert_many(initial_projects)
        logger.info("Seeded 6 initial projects")

@app.on_event("startup")
async def startup():
    await seed_admin()
    await seed_projects()

# ─── Public Routes ───

@api_router.get("/")
async def root():
    return {"message": "Portfolio API — Carlos Izaguirre"}

@api_router.get("/projects")
async def get_projects():
    projects = await db.projects.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return projects

@api_router.post("/contact")
async def create_contact(data: ContactCreate):
    contact = ContactMessage(name=data.name, email=data.email, message=data.message)
    await db.contacts.insert_one(contact.model_dump())
    send_email_notification(contact)
    return {"success": True, "message": "Mensaje recibido correctamente"}

# ─── Admin Auth ───

@api_router.post("/admin/login")
async def admin_login(data: AdminLogin):
    admin = await db.admin_users.find_one({"username": data.username})
    if not admin or not pwd_context.verify(data.password, admin["password"]):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    token = create_token(data.username)
    return {"token": token, "username": data.username}

@api_router.get("/admin/verify")
async def verify_token(admin: str = Depends(get_current_admin)):
    return {"valid": True, "username": admin}

# ─── Admin Messages ───

@api_router.get("/admin/messages")
async def get_messages(admin: str = Depends(get_current_admin)):
    messages = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return messages

@api_router.delete("/admin/messages/{msg_id}")
async def delete_message(msg_id: str, admin: str = Depends(get_current_admin)):
    result = await db.contacts.delete_one({"id": msg_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Mensaje no encontrado")
    return {"success": True}

# ─── Admin Projects ───

@api_router.post("/admin/projects")
async def create_project(data: ProjectCreate, admin: str = Depends(get_current_admin)):
    project = Project(**data.model_dump())
    await db.projects.insert_one(project.model_dump())
    return project.model_dump()

@api_router.put("/admin/projects/{project_id}")
async def update_project(project_id: str, data: ProjectUpdate, admin: str = Depends(get_current_admin)):
    update_data = {k: v for k, v in data.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    result = await db.projects.update_one({"id": project_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    updated = await db.projects.find_one({"id": project_id}, {"_id": 0})
    return updated

@api_router.delete("/admin/projects/{project_id}")
async def delete_project(project_id: str, admin: str = Depends(get_current_admin)):
    result = await db.projects.delete_one({"id": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    return {"success": True}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()