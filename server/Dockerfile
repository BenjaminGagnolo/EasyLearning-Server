# Use the official Node.js image as the parent image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your app listens on
EXPOSE $PORT

# Start the app
CMD ["npm", "start"]
