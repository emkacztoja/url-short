Admin panel

This project now includes a minimal admin panel to list and manage shortened URLs.

Backend
- New env variable: ADMIN_API_KEY (set a strong secret, min length 8)
- Admin API endpoints (prefix /api/admin):
  - GET /api/admin/urls?page=1&perPage=20&q=search — list URLs with pagination and optional search
  - PATCH /api/admin/urls/:shortId — body { isActive: boolean } to activate/deactivate
  - DELETE /api/admin/urls/:shortId — delete URL (hard delete)

Authentication
- Admin routes are protected using a simple API key. Provide it via HTTP header `x-admin-api-key` or `Authorization: Bearer <key>`.

Database
- `Url` model now has an `isActive` boolean. If an URL is deactivated (isActive=false), redirects will return 404.
- After pulling changes, run Prisma migrate locally:

  pnpm --filter backend prisma:migrate

(Or run `npx prisma migrate dev` from apps/backend)

Frontend
- Admin UI available at /admin (login at /admin/login). The UI stores the API key in localStorage under `admin_api_key` and attaches it to admin requests.

Security notes
- This is a minimal implementation using an API key. For production use consider:
  - Replacing with password+JWT or a proper user model with roles
  - Enabling stricter rate limits for the admin login
  - Using a secrets manager to store ADMIN_API_KEY

Usage
1. Set env ADMIN_API_KEY in backend host or docker-compose
2. Start backend and frontend
3. Visit frontend /admin/login, paste the API key and sign in
4. Manage URLs from the dashboard

Next steps
- Add tests (backend route integration, frontend components)
- Add audit logging for admin actions
- Add click-level analytics model if detailed stats required


