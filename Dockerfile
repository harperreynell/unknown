FROM node:20-alpine

WORKDIR /app

# Copy the package*.json files to the current directory inside the container
COPY package*.json ./

RUN npm install

# Copy the rest of the application files
COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
