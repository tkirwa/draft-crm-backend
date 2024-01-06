# Use the official Node.js image
FROM node:20

# Install MongoDB dependencies
RUN apt-get update && \
    apt-get install -y wget gnupg curl libssl-dev && \
    wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg && \
    echo "deb [ signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list && \
    apt-get update && \
    apt-get install -y mongodb-org=6.0.10 mongodb-org-database=6.0.10 mongodb-org-server=6.0.10 mongodb-org-mongos=6.0.10 mongodb-org-tools=6.0.10 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Expose MongoDB port
EXPOSE 27017

# Install necessary dependencies
RUN apt-get update && \
    apt-get install -y wget gnupg curl lsb-release && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Redis prerequisites
RUN apt-get update && \
    apt-get install -y lsb-release curl gpg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Add Redis repository key
RUN curl -fsSL https://packages.redis.io/gpg | gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

# Add Redis APT repository
RUN echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/redis.list

# Install Redis
RUN apt-get update && \
    apt-get install -y redis-server && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Expose Redis port
EXPOSE 6379

# Install NGINX
RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy the custom NGINX configuration file
COPY default.conf /etc/nginx/conf.d/

# Expose NGINX port
EXPOSE 80

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install


# Bundle app source
COPY . .

##############################################################################3
# Create a directory to store MongoDB data
RUN mkdir -p /data/db

# Copy the MongoDB data dump from your local machine to the container
COPY clarek_crm_db /data/db/clarek_crm_db

# Copy the entrypoint script
COPY docker-entrypoint.sh /usr/src/app/

# Give execute permissions to the script
RUN chmod +x /usr/src/app/docker-entrypoint.sh

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["/usr/src/app/docker-entrypoint.sh", "node", "app.js"]
