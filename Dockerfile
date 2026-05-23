# ---------------------------
# Stage 1: Build Stage
# ---------------------------
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything else (source code, configs)
COPY . .

# Debug: list files before build (optional)
# RUN ls -la /app

# Build the Vite app
RUN npm run build

# ---------------------------
# Stage 2: Runtime Stage (Nginx)
# ---------------------------
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: SPA routing config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]