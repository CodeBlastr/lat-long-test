FROM node:latest

WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Tailwind and PostCSS configurations
COPY tailwind.config.js postcss.config.js ./

# Copy Vite configuration and the rest of the app
COPY vite.config.js ./
COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
