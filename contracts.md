# API Contracts — Portafolio Carlos Izaguirre

## Admin Credentials
- **Usuario:** carlos
- **Contraseña:** CarlosAdmin2025!

## Public Endpoints

### GET /api/projects
Returns all projects sorted by creation date.
```json
[{ "id": "...", "title": "...", "description": "...", "image": "...", "category": "...", "liveUrl": "...", "githubUrl": "...", "created_at": "..." }]
```

### POST /api/contact
Saves a contact message to DB.
Body: `{ "name": "...", "email": "...", "message": "..." }`
Response: `{ "success": true }`

## Protected Endpoints (JWT Bearer token required)

### POST /api/admin/login
Body: `{ "username": "carlos", "password": "..." }`
Response: `{ "token": "jwt...", "username": "carlos" }`

### GET /api/admin/verify
Verifies JWT token validity.

### GET /api/admin/messages
Returns all contact messages.

### DELETE /api/admin/messages/{id}
Deletes a contact message.

### POST /api/admin/projects
Creates a new project. Body: project fields.

### PUT /api/admin/projects/{id}
Updates a project.

### DELETE /api/admin/projects/{id}
Deletes a project.

## Frontend Integration
- Contact form → POST /api/contact (replaces mock setTimeout)
- Projects section → GET /api/projects (replaces mock.js projects array)
- Admin panel at /admin route → login + dashboard (messages + projects CRUD)

## Email
- Configured via SMTP env vars (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)
- When not configured, messages are saved to DB only (admin checks from panel)
