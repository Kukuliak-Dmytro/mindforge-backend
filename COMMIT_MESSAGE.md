# Breaking: Migrate from Supabase Auth to Better Auth with Prisma

## Breaking Changes

- **Removed Supabase integration**: All Supabase dependencies, clients, and environment variables removed
- **Authentication middleware refactored**: Replaced Supabase-based `authenticateToken` with Better Auth session validation
- **Database migration required**: Added Better Auth tables (`AuthSession`, `Account`, `Verification`) to Prisma schema
- **Docker configuration updated**: Switched from standalone Docker to Docker Compose with entrypoint hooks

## Changes

- Integrated Better Auth with Prisma adapter for PostgreSQL
- Added Better Auth routes at `/api/auth/*` using Express integration
- Created Docker entrypoint hook (`scripts/docker-entrypoint.js`) that checks DB initialization before migrating
- Consolidated middleware folders (`middleware/` → `middlewares/`)
- Updated User model with Better Auth required fields (`emailVerified`, `name`)
- Reorganized and documented all npm scripts in `SCRIPTS.md`
- Removed obsolete Docker scripts, replaced with Docker Compose equivalents

## Migration Notes

- Run `npx prisma migrate dev` to apply new schema changes
- Update environment variables: remove `SUPABASE_*`, add `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`
- Authentication endpoints now use Better Auth session cookies instead of JWT tokens
- Existing users will need `emailVerified` field set (defaults to `false`)

