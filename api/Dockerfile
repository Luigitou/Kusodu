# Use the official Node.js image as the base image
FROM node:23-alpine AS development

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE ${API_PORT}

# Start the application in development mode
CMD ["pnpm", "run", "start:dev"]