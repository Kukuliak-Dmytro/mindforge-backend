# syntax=docker/dockerfile:1.4

# Stage 1: Builder
# This stage installs all dependencies and prepares the application for production.
# Using BuildKit cache for npm speeds up repeated builds when dependencies do not change.
FROM node:22.14.0-alpine AS builder
WORKDIR /app

# Copy only dependency files first to leverage Docker cache.
COPY package*.json ./
# Install dependencies using npm ci for clean, reproducible builds.
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy the rest of the application source code.
COPY . .

# Generate Prisma client
RUN npx prisma generate

# (Optional) Run build steps here if needed, e.g.:
# RUN npm run build

# Stage 2: Production
# This stage creates a minimal, secure image containing only what is needed to run the app.
FROM node:alpine AS production
WORKDIR /app

# Copy production dependencies and application code from builder stage.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/api.ts ./api.ts



# Use a non-root user for security best practices.
RUN adduser -D -H -s /bin/false appuser
USER appuser

EXPOSE 4000

# Start the API server.
CMD ["npm", "run", "start"]