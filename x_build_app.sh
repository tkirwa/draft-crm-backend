#!/bin/bash

mongodump --host 0.0.0.0 --port 27017 --db clarek_crm_db --out .

docker build -t draft-crm-backend_api_v3 .
