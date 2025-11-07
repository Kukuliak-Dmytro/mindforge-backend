# NPM Scripts Documentation

This document explains all available npm scripts in the Mind Forge backend project.

## Development Scripts

### `npm run dev`

Starts the development server with hot-reload using nodemon.

- Watches for changes in `src/**/*.ts`
- Automatically restarts on file changes
- Runs `predev` hook first (starts database and waits for it)

**Usage:**

```bash
npm run dev
```

---

### `npm start`

Starts the production server.

- Runs the API server directly
- Runs `prestart` hook first (starts database and waits for it)

**Usage:**

```bash
npm start
```

---

## Database Scripts

### `npm run db:up`

Starts the PostgreSQL database container using Docker Compose.

**Usage:**

```bash
npm run db:up
```

---

### `npm run db:down`

Stops the PostgreSQL database container.

**Usage:**

```bash
npm run db:down
```

---

### `npm run db:logs`

Shows live logs from the PostgreSQL container.

**Usage:**

```bash
npm run db:logs
```

---

### `npm run db:status`

Displays the status of the PostgreSQL container (name, status, ports).

**Usage:**

```bash
npm run db:status
```

---

### `npm run db:wait`

Waits for the database to be ready before proceeding.

- Used by `predev` and `prestart` hooks
- Polls database connection up to 30 times with 1-second intervals

**Usage:**

```bash
npm run db:wait
```

---

### `npm run db:migrate`

Creates and applies a new Prisma migration in development mode.

- Prompts for migration name
- Applies migration immediately
- Regenerates Prisma client

**Usage:**

```bash
npm run db:migrate
```

---

### `npm run db:migrate:deploy`

Applies pending migrations in production mode.

- Does not prompt for migration name
- Safe to run multiple times (only applies pending migrations)
- Used by Docker entrypoint hook

**Usage:**

```bash
npm run db:migrate:deploy
```

---

### `npm run db:generate`

Generates Prisma Client from the schema.

**Usage:**

```bash
npm run db:generate
```

---

### `npm run db:studio`

Opens Prisma Studio - a visual database browser.

**Usage:**

```bash
npm run db:studio
```

---

## Docker Compose Scripts

### `npm run docker:up`

Starts all services (PostgreSQL + Backend) using Docker Compose.

- Builds images if needed
- Starts containers in detached mode (`-d`)

**Usage:**

```bash
npm run docker:up
```

**Equivalent to:**

```bash
docker-compose up -d
```

---

### `npm run docker:down`

Stops and removes all containers and networks.

- Does not remove volumes (data persists)

**Usage:**

```bash
npm run docker:down
```

**To remove volumes as well:**

```bash
docker-compose down -v
```

---

### `npm run docker:build`

Builds Docker images for all services.

**Usage:**

```bash
npm run docker:build
```

**To rebuild without cache:**

```bash
docker-compose build --no-cache
```

---

### `npm run docker:logs`

Shows live logs from all containers.

**Usage:**

```bash
npm run docker:logs
```

---

### `npm run docker:logs:backend`

Shows live logs from the backend container only.

**Usage:**

```bash
npm run docker:logs:backend
```

---

### `npm run docker:rebuild`

Rebuilds all containers by removing containers and images, then rebuilding and starting them.

**Usage:**

```bash
npm run docker:rebuild
```

---

### `npm run docker:rebuild:backend`

Rebuilds only the backend container by stopping, removing, rebuilding, and starting it.

**Usage:**

```bash
npm run docker:rebuild:backend
```

---

### `npm run docker:ps`

Shows the status of all containers.

**Usage:**

```bash
npm run docker:ps
```

---

## Pre-hooks

### `predev` / `prestart`

Automatically runs before `dev` or `start` commands:

1. Starts the database (`db:up`)
2. Waits for database to be ready (`db:wait`)

These hooks ensure the database is available before starting the server.

---

## Quick Start Guide

### Local Development (without Docker)

```bash
# Start database
npm run db:up

# Wait for database (or let predev handle it)
npm run db:wait

# Run migrations
npm run db:migrate

# Start development server
npm run dev
```

### Docker Development

```bash
# Start everything
npm run docker:up

# View logs
npm run docker:logs:backend

# Stop everything
npm run docker:down
```

### Production Deployment

```bash
# Build and start
npm run docker:build
npm run docker:up

# View logs
npm run docker:logs:backend

# Apply migrations (if needed)
docker-compose exec backend npm run db:migrate:deploy
```

---

## Script Naming Convention

- **`dev`** / **`start`**: Application execution
- **`db:*`**: Database-related operations
- **`docker:*`**: Docker Compose operations
- **`pre*`**: NPM lifecycle hooks that run automatically
