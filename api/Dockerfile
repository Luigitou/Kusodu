# Use the official Node.js image as the base image
FROM node:18-alpine

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
EXPOSE 3000

# Start the application in development mode
CMD ["pnpm", "run", "start"]