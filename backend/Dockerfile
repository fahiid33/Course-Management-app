# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["npm", "run", "start:prod"]