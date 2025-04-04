# Dockerfile for a tanstack start application using pnpm
FROM node:23-alpine AS development

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json files to define dependencies
COPY package.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "run", "dev"]

# Build stage
FROM node:23-alpine AS production

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json files to define dependencies
COPY package.json ./

# Install production dependencies
RUN pnpm install

# Get the build arguments
ARG VITE_API_URL
ARG VITE_PORT

# Set environment variables
RUN echo "VITE_API_URL=$VITE_API_URL" >> .env
RUN echo "VITE_PORT=$VITE_PORT" >> .env

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "run", "start"]