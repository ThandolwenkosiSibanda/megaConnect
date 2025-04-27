### Build stage
FROM node:19.4-bullseye AS build

# 1. Use a non-root working directory
WORKDIR /usr/src/app

# 2. Copy package files first for better cache utilization
COPY package*.json ./

# 3. Install dependencies (requires Docker BuildKit for --mount)
#    If you haven’t enabled BuildKit, either enable it or remove the --mount line.
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install

# 4. Copy the rest of your source code and build
COPY . .
RUN npm run build

### Stage 2: Production container with NGINX
FROM nginxinc/nginx-unprivileged:1.23-alpine-perl

# Copy custom NGINX config if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React files from the previous stage
COPY --from=build /usr/src/app/ /usr/share/nginx/html/

EXPOSE 8080