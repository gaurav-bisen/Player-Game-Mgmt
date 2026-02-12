# Use Node image
FROM node:20-alpine

# Create app directory inside container
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire project
COPY . .

# App runs on 8080
EXPOSE 8080

# Start server
CMD ["npm","start"]
