# Simple Ethereum Indexer

## Start the backend and API server

- Start the postgres docker container

```shell
cd backend
docker compose up -d #start the container in detached mode
# psql should be up and running, listening on port :5432

# create the database
psql -h localhost -U postgres
CREATE DATABASE token_indexer_db;
```

```shell
#run migrations
DATABASE_URL=postgres://postgres:postgres@localhost:5432/token_indexer_db npm run migrate up
```

- Configure the environment variables in a .env file (see .env.example)

```shell
NODE_ENV=

SERVER_HOST=
SERVER_HTTP_PORT=
SERVER_HTTPS_PORT=
SERVER_USE_SSL=

PRIVATE_KEY_PATH=
CERTIFICATE_PATH=
ALLOWED_ORIGINS=

JWT_SECRET=
JWT_EXPIRES_IN=

LOG_LEVEL=
LOGS_DIR=

# Database
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_PORT=
DB_MAX_CONNECTIONS=20
DB_IDLE_TIMEOUT_MS=30000
DB_CONN_TIMEOUT_MS=2000

# Web3
RPC_PROVIDER=
```

- Start the server

```shell
npm install # you can use yarn to install the project dependencies
npm run start #this will start the indexer job & api server
```

## Start the client server

- Configure the environment variables in a .env file (see .env.example)

```shell
VITE_API_CLIENT
```

- Start the server

```shell
cd client
npm install # you can use yarn to install the project dependencies
npm run dev # you can also build and deploy for production
```
