# Build stage
FROM node:22.14.0-alpine AS build

# Set working directory in the container
WORKDIR /app

# Accept build args for env variables
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_API_BASE_URL

# Set env variables for build-time
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

# Copy package files and install dependencies (cache layer)
COPY package*.json ./
RUN npm ci --verbose --legacy-peer-deps && \
    npm audit --fix

# Copy the rest of the application code
COPY . .

RUN npm run build

# Production stage
FROM node:22.14.0-alpine

WORKDIR /app

COPY --from=build /app ./

EXPOSE 80

CMD ["npx", "next", "start", "-p", "80"]