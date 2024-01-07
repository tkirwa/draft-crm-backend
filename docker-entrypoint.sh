#!/bin/bash
set -e

# Print a welcome message
echo "Welcome to Clarek CRM!"

# Start the MongoDB service
mongod --fork --logpath /var/log/mongodb.log

# Import MongoDB data
mongorestore --db clarek_crm_db --drop /data/db/clarek_crm_db

# Start the Redis server
redis-server --daemonize yes

# Start the NGINX server
# service nginx restart

# Start the Node.js application
exec "$@"