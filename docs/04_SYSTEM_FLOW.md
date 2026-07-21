# System Flow

Public Profile:
Browser
→ GET /api/profiles/:username
→ Database
→ Render profile

Admin:
Login
→ Supabase Auth
→ Access Token
→ Authorization: Bearer
→ requireAdmin middleware
→ Controller
→ Database

CRUD:
Create → POST
Read → GET
Update → PUT
Delete → DELETE
