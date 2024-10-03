# Build stage
FROM node:18.20.4 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install a specific version of npm
RUN npm install -g npm@8.19.4

# Clear npm cache and install dependencies
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Rebuild node-sass if it exists
RUN npm rebuild node-sass

# Copy the rest of the code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:18.20.4-alpine

WORKDIR /app

# Copy built assets from the build stage
COPY --from=build /app/build ./build

# Install serve to run the application
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "build", "-l", "3000"]